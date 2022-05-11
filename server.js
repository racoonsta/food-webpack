const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());

app.get("/api/hello", (req, res) => {  // отвечает за принятие GET запроса
  res.send("GET запрос к странице");   // ответ на /api-hello
});

// POST method route
app.post("/api/post", (req, res) => {
  res.send('POST запрос к странице');
});

app.listen(port, () => {
  console.log(`Порт открыт: ${port}`);
});