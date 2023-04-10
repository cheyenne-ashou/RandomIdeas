const express = require("express");
const port = 5000;

const app = express();

const ideas = [
  {
    id: 1,
    text: "Positive NewsLetter, a newsletter that only shares positive, uplifting news",
    tag: "Technology",
    username: "TonyStark",
    date: "2022-01-02",
  },
  {
    id: 2,
    text: "Positive NewsLetter, a newsletter that only shares positive, uplifting news",
    tag: "Technology",
    username: "cashou985",
    date: "2022-01-11",
  },
  {
    id: 3,
    text: "Positive NewsLetter, a newsletter that only shares positive, uplifting news",
    tag: "Technology",
    username: "Homelander",
    date: "2022-02-02",
  },
  {
    id: 4,
    text: "Positive NewsLetter, a newsletter that only shares positive, uplifting news",
    tag: "Technology",
    username: "Starlight",
    date: "2022-03-02",
  },
  {
    id: 5,
    text: "Positive NewsLetter, a newsletter that only shares positive, uplifting news",
    tag: "TheDeep",
    username: "Superman",
    date: "2022-04-02",
  },
  {
    id: 6,
    text: "Positive NewsLetter, a newsletter that only shares positive, uplifting news",
    tag: "Technology",
    username: "ATrain",
    date: "2022-05-02",
  },
];

app.get("/", (req, res) => {
  res.send({ message: "Welcome to the RandomIdeas API" });
});

app.get("/api/ideas", (req, res) => {
  res.json({ success: true, data: ideas });
});

app.get("/api/ideas/:id", (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);

  if (!idea) {
    return res
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }
  return res.json({ success: true, data: idea });
});

app.listen(port, () => console.log(`Server listenting on port ${port}`));
