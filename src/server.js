const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");


// Import de rotas
const authRoutes = require("./routes/auth");
const usuariosRoutes = require("./routes/usuarios");
const animaisRoutes = require("./routes/animais");
const adocoesRoutes = require("./routes/adocoes");
const doacoesRoutes = require("./routes/doacoes");
const larTemporarioRoutes = require("./routes/larTemporario");
const ongsRoutes = require("./routes/ongs");
const relatoriosRoutes = require("./routes/relatorios");
const feedRoutes = require("./routes/feed");
const reportRoutes = require("./routes/report")

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Rotas principais
app.use("/auth", authRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/animais", animaisRoutes);
app.use("/adocoes", adocoesRoutes);
app.use("/doacoes", doacoesRoutes);
app.use("/larTemporario", larTemporarioRoutes);
app.use("/ongs", ongsRoutes);
app.use("/relatorios", relatoriosRoutes);
app.use("/feed", feedRoutes);
app.use("/report", reportRoutes)


app.get("/api", (req, res) => {
  res.json({ message: "API rodando corretamente!" });
});


app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");

  
  async function testConnection() {
    try {
      await prisma.$connect();
      console.log("Conexão com o banco de dados OK! ");
    } catch (err) {
      console.error("Erro ao conectar no banco :", err);
    } finally {
      await prisma.$disconnect();
    }
  }

  testConnection();
});
