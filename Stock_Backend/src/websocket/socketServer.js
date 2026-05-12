const { Server } = require("socket.io");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    
    const intervals = {}; // track intervals per symbol

    socket.on("subscribe-stock", async (symbol) => {
      socket.join(symbol);

      // Avoid duplicate intervals for same symbol
      if (intervals[symbol]) return;

      intervals[symbol] = setInterval(async () => {
        try {
          const data = await fetchStockPrice(symbol); // your function
          io.to(symbol).emit("stock-update", data);
        } catch (err) {
          console.error(`Error fetching ${symbol}:`, err.message);
        }
      }, 5000);
    });

    socket.on("unsubscribe-stock", (symbol) => {
      socket.leave(symbol);
      clearInterval(intervals[symbol]);
      delete intervals[symbol];
    });

    socket.on("disconnect", () => {
      // Clear all intervals for this socket
      Object.values(intervals).forEach(clearInterval);
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};