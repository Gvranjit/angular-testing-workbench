const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/saveHtml", (req, res) => {
  const htmlData = req.body;
  console.log(htmlData.text);
  fs.writeFile("saved.html", htmlData.text, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      res.status(500).send("Error saving the file.");
      return;
    }
  });
  res.send("The html has been saved as saved.html!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
