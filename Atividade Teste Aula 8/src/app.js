const express = require("express");
const { criarRotasAlunos } = require("./routes/alunoRoutes");

function criarApp(prisma) {
  const app = express();

  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({
      mensagem: "API de alunos funcionando!"
    });
  });

  app.use("/alunos", criarRotasAlunos(prisma));

  return app;
}

module.exports = { criarApp };