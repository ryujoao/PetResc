const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET - Função para listar todas as contas
const listarUsuarios = async (req, res) => {
  try {
    const contas = await prisma.account.findMany({
      include: {
        admin: true,
        ong: true,
        publico: true,
      },
    });
    res.json(contas);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar contas' });
  }
};

// POST - Função para criar uma nova conta
const criarUsuario = async (req, res) => {
  const { email, password, role, name, cnpj, descricao, endereco } = req.body;

  try {
    const novaConta = await prisma.account.create({
      data: {
        email,
        password,
        role,
        ...(role === 'ADMIN' && { admin: { create: { name } } }),
        ...(role === 'ONG' && { ong: { create: { name, cnpj, descricao, endereco } } }),
        ...(role === 'PUBLICO' && { publico: { create: { name } } }),
      },
      include: { admin: true, ong: true, publico: true },
    });
    res.status(201).json(novaConta);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar conta' });
  }
};

// PUT - Função para atualizar uma conta
const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { email, password, role, name, cnpj, descricao, endereco } = req.body;

  try {
    const usuarioId = parseInt(id);
    if (isNaN(usuarioId)) {
      return res.status(400).json({ error: 'ID de usuário inválido.' });
    }

    const usuario = await prisma.account.findUnique({
      where: { id: usuarioId },
      include: { admin: true, ong: true, publico: true },
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const contaAtualizada = await prisma.account.update({
      where: { id: usuarioId },
      data: {
        email: email || usuario.email,
        password: password || usuario.password,
        role: role || usuario.role,
      },
      include: { admin: true, ong: true, publico: true },
    });

    if (contaAtualizada.role === 'ADMIN' && usuario.admin) {
      await prisma.admin.update({
        where: { id: usuario.admin.id },
        data: { name: name || usuario.admin.name },
      });
    }

    if (contaAtualizada.role === 'ONG' && usuario.ong) {
      await prisma.ong.update({
        where: { id: usuario.ong.id },
        data: {
          name: name || usuario.ong.name,
          cnpj: cnpj || usuario.ong.cnpj,
          descricao: descricao || usuario.ong.descricao,
          endereco: endereco || usuario.ong.endereco,
        },
      });
    }

    if (contaAtualizada.role === 'PUBLICO' && usuario.publico) {
      await prisma.publico.update({
        where: { id: usuario.publico.id },
        data: { name: name || usuario.publico.name },
      });
    }

    const usuarioFinal = await prisma.account.findUnique({
      where: { id: usuarioId },
      include: { admin: true, ong: true, publico: true },
    });

    res.json(usuarioFinal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
};

// DELETE - Função para deletar uma conta
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

    if (usuario.role === 'ADMIN') {
      const totalAdmins = await prisma.account.count({
        where: { role: 'ADMIN' }
      });
      if (totalAdmins <= 1) {
        return res.status(403).json({ error: 'Não é possível remover o último admin.' });
      }
    }

    if (usuario.admin) {
      await prisma.admin.delete({ where: { id: usuario.admin.id } });
    }
    if (usuario.ong) {
      await prisma.ong.delete({ where: { id: usuario.ong.id } });
    }
    if (usuario.publico) {
      await prisma.publico.delete({ where: { id: usuario.publico.id } });
    }

    await prisma.account.delete({ where: { id: usuarioId } });

    res.json({ message: 'Usuário e dados relacionados removidos com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao tentar remover usuário.' });
  }
};

// Exporte todas as funções para que possam ser usadas no arquivo de rotas
module.exports = {
  listarUsuarios,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
};