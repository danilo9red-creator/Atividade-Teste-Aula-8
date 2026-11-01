import { describe, it, expect, vi, beforeEach } from "vitest";

const request = require("supertest");
const { criarApp } = require("../src/app");

describe("Testes das rotas de alunos", () => {
  const prismaMock = {
    aluno: {
      findMany: vi.fn(),
      create: vi.fn()
    }
  };

  const app = criarApp(prismaMock);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve listar os alunos cadastrados", async () => {
    prismaMock.aluno.findMany.mockResolvedValue([
      {
        id: 1,
        nome: "João Silva",
        email: "joao@email.com",
        curso: "ADS"
      }
    ]);

    const resposta = await request(app).get("/alunos");

    expect(resposta.status).toBe(200);
    expect(resposta.body).toHaveLength(1);
    expect(resposta.body[0].nome).toBe("João Silva");
  });

  it("deve cadastrar um aluno corretamente", async () => {
    const novoAluno = {
      nome: "Maria Souza",
      email: "maria@email.com",
      curso: "ADS"
    };

    prismaMock.aluno.create.mockResolvedValue({
      id: 2,
      ...novoAluno,
      createdAt: new Date().toISOString()
    });

    const resposta = await request(app)
      .post("/alunos")
      .send(novoAluno);

    expect(resposta.status).toBe(201);
    expect(resposta.body.nome).toBe("Maria Souza");
    expect(prismaMock.aluno.create).toHaveBeenCalled();
  });

  it("deve rejeitar cadastro com e-mail inválido", async () => {
    const alunoInvalido = {
      nome: "Pedro Silva",
      email: "pedroemail.com",
      curso: "ADS"
    };

    const resposta = await request(app)
      .post("/alunos")
      .send(alunoInvalido);

    expect(resposta.status).toBe(400);
    expect(resposta.body.erro).toBe("E-mail inválido");
  });
});