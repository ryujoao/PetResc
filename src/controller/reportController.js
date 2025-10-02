const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const criarReport = async (req, res) => {
    // Pega o ID do usuário logado diretamente do token (mais seguro)
    const usuarioLogadoId = req.account.id;
    
    // Pega os dados do corpo da requisição
    const { descricao, localizacao, contato, animalId, anonimo } = req.body;

    if (!descricao || !localizacao) {
        return res.status(400).json({ error: "Descrição e localização são obrigatórias." });
    }

    try {
        const dadosParaCriar = {
            descricao,
            localizacao,
            contato: contato || "", // Garante que contato não seja nulo se não for enviado
            anonimo: anonimo || false,
            autor: { // Usa o nome da relação 'autor' para conectar ao usuário
                connect: {
                    id: usuarioLogadoId
                }
            }
        };

        // Adiciona a conexão com o animal apenas se um animalId for fornecido
        if (animalId) {
            dadosParaCriar.animal = {
                connect: {
                    id: parseInt(animalId)
                }
            };
        }

        // Usa prisma.denuncia, pois o modelo no schema é 'Denuncia'
        const novaDenuncia = await prisma.denuncia.create({
            data: dadosParaCriar
        });

        res.status(201).json({ message: "Denúncia registrada com sucesso", denuncia: novaDenuncia });

    } catch (err) {
        console.error("ERRO DETALHADO AO CRIAR DENÚNCIA:", err);
        res.status(500).json({ error: "Erro ao registrar denúncia" });
    }
};
// Listardenuncias
const listarReports = async (req, res) => {
  try {
    const denuncias = await prisma.denuncia.findMany({
      include: {
        animal: true,
        autor: true // O nome da relação com Account é 'autor'
      }
    });
    res.json(denuncias);
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
    const reportId = parseInt(req.params.id);
    const usuarioLogadoId = req.account.id;

    try {
        // Primeiro, busca a denúncia no banco
        const report = await prisma.report.findUnique({
            where: { id: reportId }
        });

        if (!report) {
            return res.status(404).json({ error: "Denúncia não encontrada" });
        }

        // VERIFICA SE O USUÁRIO LOGADO É O DONO DA DENÚNCIA
        if (report.usuarioId !== usuarioLogadoId) {
            return res.status(403).json({ error: "Acesso negado. Você não tem permissão para apagar esta denúncia." });
        }

        // Se passou na verificação, pode apagar
        await prisma.report.delete({ where: { id: reportId } });
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
