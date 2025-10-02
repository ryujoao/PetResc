const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

// ADMIN: Lista todas as contas
const listarUsuarios = async (req, res) => {
  try {
    const contas = await prisma.account.findMany({
      include: { admin: true, ong: true, publico: true },
    });
    contas.forEach(conta => delete conta.password);
    res.json(contas);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar contas' });
  }
};

// ADMIN: Cria uma conta
const criarUsuario = async (req, res) => {
  const { email, password, role, name, cnpj, descricao, endereco } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Preencha email, senha e role' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const novaConta = await prisma.account.create({
      data: {
        email,
        password: hashedPassword,
        role,
        ...(role === 'ADMIN' && { admin: { create: { name } } }),
        ...(role === 'ONG' && { ong: { create: { name, cnpj, descricao, endereco } } }),
        ...(role === 'PUBLICO' && { publico: { create: { name } } }),
      },
      include: { admin: true, ong: true, publico: true },
    });
    delete novaConta.password;
    res.status(201).json(novaConta);
  } catch (err) {
    console.error(err);
    if (err.code === 'P2002' && err.meta?.target?.includes('email')) {
      return res.status(400).json({ error: 'Email já está em uso.' });
    }
    res.status(500).json({ error: 'Erro ao criar conta' });
  }
};

// DELETE: Remove usuário
const deletarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioId = parseInt(id);
    if (isNaN(usuarioId)) return res.status(400).json({ error: 'ID inválido' });

    const usuario = await prisma.account.findUnique({
      where: { id: usuarioId },
      include: { admin: true, ong: true, publico: true }
    });
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

    if (usuario.role === 'ADMIN') {
      const totalAdmins = await prisma.account.count({ where: { role: 'ADMIN' } });
      if (totalAdmins <= 1) return res.status(403).json({ error: 'Não é possível remover o último admin' });
    }

    if (usuario.admin) await prisma.admin.delete({ where: { id: usuario.admin.id } });
    if (usuario.ong) await prisma.ong.delete({ where: { id: usuario.ong.id } });
    if (usuario.publico) await prisma.publico.delete({ where: { id: usuario.publico.id } });
    await prisma.account.delete({ where: { id: usuarioId } });

    res.json({ message: 'Usuário removido com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao remover usuário' });
  }
};



// PÚBLICO: Registro
const registrarUsuarioPublico = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const novaConta = await prisma.account.create({
      data: { email, password: hashedPassword, role: 'PUBLICO', publico: { create: { nome: name } } }, 
  include: { publico: true }
    });
    delete novaConta.password;
    res.status(201).json(novaConta);
  } catch (err) {
    console.error("ERRO DETALHADO DO PRISMA:", err);
    if (err.code === 'P2002' && err.meta?.target?.includes('email')) {
      return res.status(400).json({ error: 'Este email já está em uso.' });
    }
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
};


// LOGADO: Obter usuário (VERSÃO DE DEBUG)
const obterUsuarioPorId = async (req, res) => {
    console.log("\n--- [DEBUG] REQUISIÇÃO RECEBIDA EM GET /usuarios/:id ---");

    try {
        const userIdToView = parseInt(req.params.id);
        console.log(`--- [DEBUG] ID para visualizar: ${userIdToView}`);

        const loggedInUser = req.account;
        console.log("--- [DEBUG] Dados do usuário extraídos do token (req.account):", loggedInUser);

        // Verificação para evitar crash se o token for inválido e loggedInUser for nulo
        if (!loggedInUser) {
            console.log("--- [DEBUG] ERRO: req.account está indefinido. O middleware de autenticação pode ter falhado.");
            // Retornando um erro claro aqui, caso seja esse o problema.
            return res.status(500).json({ error: "Falha na autenticação - req.account não definido." });
        }

        if (loggedInUser.role !== 'ADMIN' && loggedInUser.id !== userIdToView) {
            console.log("--- [DEBUG] Acesso negado pela regra de permissão.");
            return res.status(403).json({ error: "Acesso negado" });
        }

        console.log("--- [DEBUG] Permissão concedida. Buscando no banco de dados...");
        const account = await prisma.account.findUnique({
            where: { id: userIdToView },
            include: { admin: true, ong: true, publico: true }
        });
        
        console.log("--- [DEBUG] Resultado da busca no banco:", account);

        if (!account) {
            console.log("--- [DEBUG] Usuário não encontrado no banco.");
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        delete account.password;
        console.log("--- [DEBUG] Enviando resposta de sucesso.");
        res.json(account);

    } catch (err) {
        console.log("--- [DEBUG] !!! ERRO CAPTURADO NO BLOCO CATCH !!! ---");
        console.error(err); // Forçando a exibição do erro
        res.status(500).json({ error: 'Erro ao obter usuário.' });
    }
};

// LOGADO: Atualizar usuário
const atualizarUsuario = async (req, res) => {
  try {
    const userIdToUpdate = parseInt(req.params.id);
    const loggedInUser = req.account;
    const { name, email } = req.body;

    if (loggedInUser.role !== 'ADMIN' && loggedInUser.id !== userIdToUpdate) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const account = await prisma.account.findUnique({ where: { id: userIdToUpdate } });
    if (!account) return res.status(404).json({ error: 'Conta não encontrada' });

    // Checar duplicidade de email
    if (email && email !== account.email) {
      const emailExist = await prisma.account.findUnique({ where: { email } });
      if (emailExist) return res.status(400).json({ error: 'Email já em uso' });
    }

    // Atualizar profile (name) e email
    let profileUpdate;
    if (name) {
      if (account.role === 'PUBLICO') profileUpdate = prisma.publico.updateMany({ where: { accountId: userIdToUpdate }, data: { name } });
      else if (account.role === 'ADMIN') profileUpdate = prisma.admin.updateMany({ where: { accountId: userIdToUpdate }, data: { name } });
      else if (account.role === 'ONG') profileUpdate = prisma.ong.updateMany({ where: { accountId: userIdToUpdate }, data: { name } });
    }

    const [updatedAccount] = await prisma.$transaction([
      prisma.account.update({ where: { id: userIdToUpdate }, data: { email } }),
      ...(profileUpdate ? [profileUpdate] : [])
    ]);

    delete updatedAccount.password;
    res.json({ message: "Usuário atualizado com sucesso", account: updatedAccount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
};

module.exports = {
  listarUsuarios,
  criarUsuario,
  deletarUsuario,
  registrarUsuarioPublico,
  obterUsuarioPorId,
  atualizarUsuario
};
