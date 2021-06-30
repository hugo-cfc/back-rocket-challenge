const express = require("express");
const { uuid } = require("uuidv4");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  res.send(repository);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const { title, url, techs, like } = req.body;

  const repositoryIndex = repositories.findIndex((repository) => repository.id === id);

  if (repositoryIndex < 0) {
    return res.status(400).json({ error: "repository not found" });
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes,
  };

  repositories[repositoryIndex] = repository;

  res.send(repository);
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repository = repositories.find((repository) => repository.id === id);

  if (!repository) return res.status(400).json({ error: "repository not found" });

  repository.likes += 1;

  res.send(repository);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex((repository) => repository.id === id);

  if (repositoryIndex < 0) {
    return res.status(400).json({ error: "repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return res.status(200).send();
});

app.listen(3333, () => {
  console.log("🚀 Back-end started");
});
