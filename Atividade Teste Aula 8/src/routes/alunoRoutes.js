const express = require("express");
const { validarAluno } = require("../services/alunoService");

function criarRotasAlunos(prisma) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const alunos = await prisma.aluno.findMany();

      res.status(200).json(alunos);
    } catch (error) {
      res.status(500).json({
        erro: "Erro ao buscar alunos"
      });
    }
  });

  router.post("/", async (req, res) => {
    try {
      validarAluno(req.body);

      const aluno = await prisma.aluno.create({
        data: req.body
      });

      res.status(201).json(aluno);
    } catch (error) {
      if (
        error.message === "Todos os campos são obrigatórios" ||
        error.message === "E-mail inválido"
      ) {
        return res.status(400).json({
          erro: error.message
        });
      }

      res.status(500).json({
        erro: "Erro ao cadastrar aluno"
      });
    }
  });

  return router;
}

module.exports = { criarRotasAlunos };