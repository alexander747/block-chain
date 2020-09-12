const webSocket = require("ws");

const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];
const P2P_PORT = process.env.P2P_PORT || 5001;

class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
    console.log("constructor");
  }

  listen() {
    const server = new webSocket.Server({ port: P2P_PORT });
    server.on("connection", (socket) => this.connectSocket(socket));
    this.connectToPeers();
    console.log("Listening for peer to peer connections on port " + P2P_PORT);
  }

  connectToPeers() {
    peers.forEach((peer) => {
      console.log("eder");
      const sokect = new webSocket(peer);
      sokect.on("open", () => this.connectSocket(sokect));
    });
  }

  connectSocket(socket) {
    console.log("entro");
    this.sockets.push(socket);
    console.log(`Socket connected`);
  }
}

module.exports = P2pServer;
