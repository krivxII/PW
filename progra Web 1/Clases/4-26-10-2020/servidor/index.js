const net = require("net");
const createHttpResponse = require("./createHttpResponse.js");

const server = net.createServer((socket) => {
  console.log("new connection");

  socket.on("data", (data) => {
    console.log("data received");
    // method
    // path
    // headers
    // body

    const httpResponse = createHttpResponse(
      {
        "x-hello": "world",
      },
      "ok",
      200
    );
    socket.write(httpResponse);
  });

  socket.on("end", () => {
    console.log("connection ended");
  });
});

server.listen(3000);
