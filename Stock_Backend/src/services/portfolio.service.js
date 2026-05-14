const prisma =
  require("../config/db");

const stockService =
  require("./stock.service");

exports.getPortfolioData =
  async (userId) => {

    const portfolio =
      await prisma.portfolio.findMany({
        where: { userId }
      });

    const result = [];

    for (const stock of portfolio) {

      const liveData =
        await stockService.getStockPrice(
          stock.stockSymbol
        );

      const currentPrice =
        parseFloat(liveData.price);

      const currentValue =
        currentPrice * stock.quantity;

      const invested =
        stock.avgBuyPrice
        * stock.quantity;

      const pnl =
        currentValue - invested;

      result.push({
        ...stock,
        currentPrice,
        currentValue,
        invested,
        pnl
      });
    }

    return result;
};