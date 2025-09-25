const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');


  //ADMIN Lista todas as contas do sistema.
 
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


  //ADMIN Cria uma conta com qualquer 'role' (ADMIN, ONG, PUBLICO).
 
const criarUsuario = async (req, res) => {
  const { email, password, role, name, cnpj, descricao, endereco } = req.body;
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
    res.status(500).json({ error: 'Erro ao criar conta' });
  }
};


 // ADMIN Deleta uma conta e todos os seus dados relacionados.
 
const deletarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioId = parseInt(id);
    if (isNaN(usuarioId)) {
      return res.status(400).json({ error: 'ID de usuário inválido.' });
    }
    const usuario = await prisma.account.findUnique({
      where: { id: usuarioId },
      include: { admin: true, ong: true, publico: true }
    });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    // Lógica para impedir a remoção do último admin
    if (usuario.role === 'ADMIN') {
      const totalAdmins = await prisma.account.count({ where: { role: 'ADMIN' } });
      if (totalAdmins <= 1) {
        return res.status(403).json({ error: 'Não é possível remover o último admin.' });
      }
    }
    if (usuario.admin) await prisma.admin.delete({ where: { id: usuario.admin.id } });
    if (usuario.ong) await prisma.ong.delete({ where: { id: usuario.ong.id } });
    if (usuario.publico) await prisma.publico.delete({ where: { id: usuario.publico.id } });
    
    await prisma.account.delete({ where: { id: usuarioId } });
    
    res.json({ message: 'Usuário e dados relacionados removidos com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao tentar remover usuário.' });
  }
};


 // PÚBLICO Registra um novo usuario com a role 'PUBLICO'.

const registrarUsuarioPublico = async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const novaConta = await prisma.account.create({
            data: {
                email,
                password: hashedPassword,
                role: 'PUBLICO', 
                publico: { create: { name } }
            },
            include: { publico: true }
        });
        delete novaConta.password;
        res.status(201).json(novaConta);
        } catch (err) {
    console.error("ERRO DETALHADO DO PRISMA:", err); // <-- ADICIONE ESTA LINHA

    if (err.code === 'P2002' && err.meta?.target?.includes('email')) {
        return res.status(400).json({ error: 'Este email já está em uso.' });
    }
    // A linha abaixo é a que está enviando o erro genérico para o Postman
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
}
};


 // LOGADO Obtem os dados de um perfil.
 
const obterUsuarioPorId = async (req, res) => {
    try {
        const userIdToView = parseInt(req.params.id);
        const loggedInUser = req.account; // Injetado pelo middleware authenticateToken

        // LÓGICA DE AUTORIZAÇÃO
        if (loggedInUser.role !== 'ADMIN' && loggedInUser.id !== userIdToView) {
            return res.status(403).json({ error: "Acesso negado. Você não tem permissão para ver este perfil." });
        }

        const account = await prisma.account.findUnique({
            where: { id: userIdToView },
            include: { admin: true, ong: true, publico: true }
        });

        if (!account) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        delete account.password;
        res.json(account);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao obter usuário.' });
    }
};


  //LOGADO Atualiza os dados de um perfil.
 
const atualizarUsuario = async (req, res) => {
    try {
        const userIdToUpdate = parseInt(req.params.id);
        const loggedInUser = req.account;
        const { name, email } = req.body;

        if (loggedInUser.role !== 'ADMIN' && loggedInUser.id !== userIdToUpdate) {
            return res.status(403).json({ error: "Acesso negado. Você não pode atualizar este perfil." });
        }

        const account = await prisma.account.findUnique({ where: { id: userIdToUpdate }});
        if (!account) return res.status(404).json({ error: 'Conta não encontrada.' });

        let profileUpdate;
        if (name) {
            if (account.role === 'PUBLICO') {
                profileUpdate = prisma.publico.updateMany({ where: { accountId: userIdToUpdate }, data: { name } });
            } else if (account.role === 'ADMIN') {
                profileUpdate = prisma.admin.updateMany({ where: { accountId: userIdToUpdate }, data: { name } });
            }
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