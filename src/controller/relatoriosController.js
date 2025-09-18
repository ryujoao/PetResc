const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Relatório animais 
const relatorioAnimais = async (req, res) => {
  try {
    const total = await prisma.animal.count();
    const disponiveis = await prisma.animal.count({ where: { status: 'disponivel' } });
    const adotados = await prisma.animal.count({ where: { status: 'adotado' } });

    res.json({ total, disponiveis, adotados });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar relatório de animais' });
  }
};

// Relatório doacoes
const relatorioDoacoes = async (req, res) => {
  try {
    const total = await prisma.doacao.count();
    const soma = await prisma.doacao.aggregate({
      _sum: { valor: true },
      _avg: { valor: true }
    });

    res.json({
      total,
      valor_total: soma._sum.valor || 0,
      media: soma._avg.valor || 0
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar relatório de doações' });
  }
};

// Relatório usuarios
const relatorioUsuarios = async (req, res) => {
  try {
    const total = await prisma.usuario.count();
    const admins = await prisma.usuario.count({ where: { tipo: 'admin' } });
    const ongs = await prisma.usuario.count({ where: { tipo: 'ong' } });
    const normais = await prisma.usuario.count({ where: { tipo: 'normal' } });

    res.json({ total, admins, ongs, usuarios_normais: normais });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar relatório de usuários' });
  }
};

module.exports = {
  relatorioAnimais,
  relatorioDoacoes,
  relatorioUsuarios
};
