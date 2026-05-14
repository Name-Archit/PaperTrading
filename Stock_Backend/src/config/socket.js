const { Server } =
  require("socket.io");

let io;

exports.initSocket =
  (server) => {

    io = new Server(server, {
      cors: {
        origin:
          process.env.FRONTEND_URL
      }
    });

    io.on("connection", (socket) => {

      console.log(
        "Socket connected"
      );

      socket.on(
        "disconnect",
        () => {
          console.log(
            "Socket disconnected"
          );
        }
      );
    });

    return io;
};

exports.getIO = () => {

  if (!io) {
    throw new Error(
      "Socket not initialized"
    );
  }

  return io;
};