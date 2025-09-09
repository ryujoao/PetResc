const express = require('express');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuarios');
const animaisRoutes = require('./routes/animais');
const authRoutes = require('./routes/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/auth', authRoutes);


app.use('/usuarios', usuariosRoutes);
app.use('/animais', animaisRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'API rodando corretamente!' });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');

  async function testConnection() {
    try {
      await prisma.$connect();
      console.log('Conexão com o banco de dados OK!');
    } catch (err) {
      console.error('Erro ao conectar no banco:', err);
    } finally {
      await prisma.$disconnect();
    }
  }

  testConnection();
});
