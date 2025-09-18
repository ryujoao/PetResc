const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// CREATE
const criarReport = async (req, res) => {
  const { animalId, usuarioId, descricao } = req.body;

  if (!animalId || !usuarioId || !descricao) {
    return res.status(400).json({ error: "Preencha todos os campos obrigatórios" });
  }

  try {
    const report = await prisma.report.create({
      data: { animalId, usuarioId, descricao }
    });
    res.status(201).json({ message: "Denúncia registrada com sucesso", report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao registrar denúncia" });
  }
};

// Listardenuncias
const listarReports = async (req, res) => {
  try {
    const reports = await prisma.report.findMany({
      include: { animal: true, usuario: true }
    });
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar denúncias" });
  }
};

// PUT
const atualizarReport = async (req, res) => {
  const { id } = req.params;
  const { descricao } = req.body;

  if (!descricao) return res.status(400).json({ error: "Descrição é obrigatória" });

  try {
    const report = await prisma.report.update({
      where: { id: parseInt(id) },
      data: { descricao }
    });
    res.json({ message: "Denúncia atualizada com sucesso", report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar denúncia" });
  }
};

// DELETE
const apagarReport = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.report.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Denúncia apagada com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao apagar denúncia" });
  }
};

module.exports = {
  criarReport,
  listarReports,
  atualizarReport,
  apagarReport
};
