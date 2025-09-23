const { PrismaClient, StatusAdocao } = require("@prisma/client");
const prisma = new PrismaClient();

// GET padrão
const getFeed = async (req, res) => {
  try {
    const animais = await prisma.animal.findMany({
      where: {
        status: StatusAdocao.DISPONIVEL, 
      },
      include: {
        ong: {
          select: {
            id: true,
            name: true,
            endereco: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(animais);
  } catch (error) {
    console.error("Erro ao carregar feed:", error);
    res.status(500).json({ error: "Erro ao carregar feed de animais" });
  }
};

// GET com filtros
const getFeedComFiltro = async (req, res) => {
  try {
    const { especie, porte, idade } = req.query;

    const animais = await prisma.animal.findMany({
      where: {
        status: StatusAdocao.DISPONIVEL,
        ...(especie && { especie }),
        ...(porte && { porte }),
        ...(idade && { idade }),
      },
      include: {
        ong: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(animais);
  } catch (error) {
    console.error("Erro ao carregar feed filtrado:", error);
    res.status(500).json({ error: "Erro ao carregar feed filtrado" });
  }
};

module.exports = {
  getFeed,
  getFeedComFiltro,
};
