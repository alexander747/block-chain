const express = require("express");

const bodyParser = require("body-parser");

const Blockchain = require("../blockchain");

// const HTTP_PORT = process.env.HTTP_PORT || 3000;
const HTTP_PORT = process.env.HTTP_PORT || 3000;

const P2pServer = require("./p2pServer");

const app = express();

const bc = new Blockchain();

const p2pServer = new P2pServer(bc);

app.use(bodyParser.json());

app.get("/blocks", (req, res) => {
  res.json(bc.chain);
});

app.post("/mine", (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`new block added: ${block.toString()}`);
  p2pServer.syncChains();
  res.redirect("/blocks");
});

app.listen(HTTP_PORT, () => {
  console.log("http server listening on port " + HTTP_PORT);
});

p2pServer.listen();
