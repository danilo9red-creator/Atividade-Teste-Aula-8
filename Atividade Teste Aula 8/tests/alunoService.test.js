import { describe, it, expect } from "vitest";
const { validarAluno } = require("../src/services/alunoService");

describe("Testes do serviço de alunos", () => {
  it("deve validar um aluno corretamente", () => {
    const aluno = {
      nome: "João Silva",
      email: "joao@email.com",
      curso: "Análise e Desenvolvimento de Sistemas"
    };

    expect(validarAluno(aluno)).toBe(true);
  });

  it("deve rejeitar aluno sem todos os campos", () => {
    const aluno = {
      nome: "João Silva",
      email: "joao@email.com"
    };

    expect(() => validarAluno(aluno)).toThrow(
      "Todos os campos são obrigatórios"
    );
  });

  it("deve rejeitar e-mail inválido", () => {
    const aluno = {
      nome: "João Silva",
      email: "joaoemail.com",
      curso: "ADS"
    };

    expect(() => validarAluno(aluno)).toThrow("E-mail inválido");
  });
});