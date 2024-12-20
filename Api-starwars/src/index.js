const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const port = 3000;

const Film = mongoose.model("Film", {
  title: String,
  description: String,
  image_url: String,
  trailer_url: String,
});

const Alunos = mongoose.model("Dados", {
  Nome: String,
  Idade: Number,
  Atividade: String,
  DiaDePagento: Date,
});

app.get("/", async (req, res) => {
  const films = await Film.find();
  res.send(films);
});

app.put("/:id", async (req, res) => {
  const film = await Film.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
  });

  return res.send(film);
});

app.delete("/:id", async (req, res) => {
  const film = await Film.findByIdAndDelete(req.params.id);
  return res.send(film);
});

app.post("/", async (req, res) => {
  const film = new Film({
    title: req.body.title,
    description: req.body.description,
  });

  await film.save();
  res.send(film);
});

app.listen(port, () => {
  mongoose.connect(
    "mongodb+srv://cala:Ga5566.2469@starwars-api.fbbiw.mongodb.net/?retryWrites=true&w=majority&appName=Starwars-API"
  );
  console.log("App running");
});
