const express = require("express");
const app = express();

app.use(express.json());

// ======================
// Banco de dados em memória
// ======================
let bugs = [];
let nextId = 1;

// ======================
// ENDPOINTS
// ======================

// Rota de teste
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// Criar um BUG
app.post("/bugs", (req, res) => {
  const { titulo, descricao, prioridade } = req.body;

  if (!titulo || !descricao || !prioridade) {
    return res.status(400).json({ error: "Campos obrigatórios: titulo, descricao, prioridade" });
  }

  const novoBug = {
    id: nextId++,
    titulo,
    descricao,
    prioridade,
    status: "aberto",
    criadoEm: new Date()
  };

  bugs.push(novoBug);

  res.status(201).json(novoBug);
});

// GET /bugs - listar todos os bugs
app.get("/bugs", (req, res) => {
  return res.json(bugs);
});

// GET /bugs/:id - buscar bug por id
app.get("/bugs/:id", (req, res) => {
  const id = Number(req.params.id);
  const bug = bugs.find(b => b.id === id);

  if (!bug) {
    return res.status(404).json({ error: "Bug não encontrado" });
  }

  return res.json(bug);
});

// PUT /bugs/:id - atualizar um bug (aceita campos enviados)
app.put("/bugs/:id", (req, res) => {
  const id = Number(req.params.id);
  const bugIndex = bugs.findIndex(b => b.id === id);

  if (bugIndex === -1) {
    return res.status(404).json({ error: "Bug não encontrado" });
  }

  const { titulo, descricao, prioridade, status } = req.body;

  // Atualiza somente campos enviados (comportamento prático; poderíamos usar PATCH para parcial e PUT para substituição completa)
  if (titulo !== undefined) bugs[bugIndex].titulo = titulo;
  if (descricao !== undefined) bugs[bugIndex].descricao = descricao;
  if (prioridade !== undefined) bugs[bugIndex].prioridade = prioridade;
  if (status !== undefined) bugs[bugIndex].status = status;

  bugs[bugIndex].atualizadoEm = new Date();

  return res.json(bugs[bugIndex]);
});

// DELETE /bugs/:id - apagar um bug
app.delete("/bugs/:id", (req, res) => {
  const id = Number(req.params.id);
  const bugIndex = bugs.findIndex(b => b.id === id);

  if (bugIndex === -1) {
    return res.status(404).json({ error: "Bug não encontrado" });
  }

  const apagado = bugs.splice(bugIndex, 1)[0];

  return res.json({ message: "Bug removido", bug: apagado });
});

// ======================
// Servidor
// ======================
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
