const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET || 'pet123';

// Função  registrar 
exports.register = async (req, res) => {
  const { email, password, role, nome, cnpj, descricao, endereco } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const novaConta = await prisma.account.create({
      data: {
        email,
        password: hashedPassword,
        role,
        ...(role === 'ADMIN' && { admin: { create: { nome } } }),
        ...(role === 'ONG' && { ong: { create: { nome, cnpj, descricao, endereco } } }),
        ...(role === 'PUBLICO' && { publico: { create: { nome } } }),
      },
      include: { admin: true, ong: true, publico: true },
    });

    res.status(201).json(novaConta);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar conta.' });
  }
};

// Função login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await prisma.account.findUnique({
      where: { email },
      include: { admin: true, ong: true, publico: true },
    });

    if (!usuario) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }

    const passwordMatch = await bcrypt.compare(password, usuario.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }

    const token = jwt.sign({ id: usuario.id, role: usuario.role }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, usuario });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
};

// Função retornar dado logado
exports.me = async (req, res) => {
  try {
    const usuario = await prisma.account.findUnique({
      where: { id: req.user.id },
      include: { admin: true, ong: true, publico: true },
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar dados do usuário.' });
  }
};
