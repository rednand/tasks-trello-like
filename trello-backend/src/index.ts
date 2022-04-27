import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = 4000;

let lists = [
  {
    id: "0",
    text: "To Do",
    tasks: [{ id: "c0", text: "Things to do" }],
  },
  {
    id: "1",
    text: "In Progress",
    tasks: [{ id: "c2", text: "Things I'm doing" }],
  },
  {
    id: "2",
    text: "Done",
    tasks: [{ id: "c3", text: "Things I'm going to do" }],
  },
];

app.post("/save", (req, res) => {
  console.log(req.body);
  lists = req.body.lists;
  return lists;
});

app.get("/load", (req, res) => res.json({ lists }));

app.listen(port, () =>
  console.log(`Kanban backend running on http://localhost:${port}!`)
);
