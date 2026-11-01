function validarAluno(aluno) {
  if (!aluno.nome || !aluno.email || !aluno.curso) {
    throw new Error("Todos os campos são obrigatórios");
  }

  if (!aluno.email.includes("@")) {
    throw new Error("E-mail inválido");
  }

  return true;
}

module.exports = {
  validarAluno
};