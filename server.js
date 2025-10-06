import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;
const __dirname = path.resolve();

app.use(express.static("public"));
app.use(bodyParser.json());

app.post("/post", (req, res) => {
  const posts = JSON.parse(fs.readFileSync("data.json", "utf8") || "[]");
  posts.unshift({ title: req.body.title, content: req.body.content, date: new Date().toLocaleString() });
  fs.writeFileSync("data.json", JSON.stringify(posts, null, 2));
  res.send({ ok: true });
});

app.get("/posts", (req, res) => {
  const posts = JSON.parse(fs.readFileSync("data.json", "utf8") || "[]");
  res.send(posts);
});

app.listen(PORT, () => console.log(`서버 실행 중: http://localhost:${PORT}`));

//danke chat gpt