const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'pet123';

//  REGISTER 
exports.register = async (req, res) => {
  const { email, password, role, name, cnpj, descricao, endereco } = req.body;

  try {
    // Verifica se email já existe
    const existingUser = await prisma.account.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'E-mail já cadastrado.' });

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

    // Remove senha antes de enviar
    const { password: _, ...usuarioSemSenha } = novaConta;

    res.status(201).json(usuarioSemSenha);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar conta.' });
  }
};

//  LOGIN 
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await prisma.account.findUnique({
      where: { email },
      include: { admin: true, ong: true, publico: true },
    });

    if (!usuario) return res.status(401).json({ error: 'E-mail ou senha inválidos.' });

    const passwordMatch = await bcrypt.compare(password, usuario.password);
    if (!passwordMatch) return res.status(401).json({ error: 'E-mail ou senha inválidos.' });

    // Gera token com id, role e opcionalmente name
    const token = jwt.sign(
      { id: usuario.id, role: usuario.role, name: usuario.name },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Remove senha 
    const { password: _, ...usuarioSemSenha } = usuario;

    res.json({ token, usuario: usuarioSemSenha });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
};

//  ME 
exports.me = async (req, res) => {
  try {
    const usuario = await prisma.account.findUnique({
      where: { id: req.user.id },
      include: { admin: true, ong: true, publico: true },
    });

    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado.' });

    const { password: _, ...usuarioSemSenha } = usuario;

    res.json(usuarioSemSenha);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar dados do usuário.' });
  }
};
