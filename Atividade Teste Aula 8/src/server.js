const { PrismaClient } = require("@prisma/client");
const { criarApp } = require("./app");

const prisma = new PrismaClient();

const app = criarApp(prisma);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});