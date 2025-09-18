const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET 
exports.getAll = async (req, res) => {
  try {
    const doacoes = await prisma.doacao.findMany({
      include: {
        usuario: true,
        ong: true,
      },
    });
    res.json(doacoes);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar doações' });
  }
};

// GET por id
exports.getById = async (req, res) => {
  const { id } = req.params;

  try {
    const doacao = await prisma.doacao.findUnique({
      where: { id: parseInt(id) },
      include: { usuario: true, ong: true },
    });

    if (!doacao) {
      return res.status(404).json({ error: 'Doação não encontrada' });
    }

    res.json(doacao);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar doação' });
  }
};

// POST 
exports.create = async (req, res) => {
  const { usuarioId, ongId, valor } = req.body;

  if (!usuarioId || !ongId || !valor) {
    return res.status(400).json({ error: 'Usuário, ONG e valor são obrigatórios' });
  }

  try {
    const novaDoacao = await prisma.doacao.create({
      data: {
        usuarioId: parseInt(usuarioId),
        ongId: parseInt(ongId),
        valor: parseFloat(valor),
      },
      include: { usuario: true, ong: true },
    });

    res.status(201).json(novaDoacao);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar doação' });
  }
};

// GET /doacoes por ong id 
exports.getByOng = async (req, res) => {
  const { id } = req.params;

  try {
    const doacoes = await prisma.doacao.findMany({
      where: { ongId: parseInt(id) },
      include: { usuario: true },
    });

    res.json(doacoes);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar doações da ONG' });
  }
};
