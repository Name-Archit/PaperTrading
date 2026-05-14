const stockService =
  require("./stock.service");

exports.startStockStream =
  (io) => {

    setInterval(async () => {

      const symbols = [
        "RELIANCE:NSE",
        "TCS:NSE",
        "INFY:NSE"
      ];

      for (const symbol of symbols) {

        const data =
          await stockService.getStockPrice(
            symbol
          );

        io.emit("stock-update", {
          symbol,
          price: data.price
        });
      }

    }, 5000);
};