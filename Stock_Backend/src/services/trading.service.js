const prisma =
  require("../config/db");

exports.updatePortfolio =
  async (
    userId,
    symbol,
    quantity,
    price
  ) => {

    const existing =
      await prisma.portfolio.findFirst({
        where: {
          userId,
          stockSymbol: symbol
        }
      });

    if (existing) {

      const totalQty =
        existing.quantity + quantity;

      const avgPrice =
        (
          existing.avgBuyPrice
          * existing.quantity
          + price * quantity
        ) / totalQty;

      return prisma.portfolio.update({
        where: {
          id: existing.id
        },

        data: {
          quantity: totalQty,
          avgBuyPrice: avgPrice
        }
      });
    }

    return prisma.portfolio.create({
      data: {
        userId,
        stockSymbol: symbol,
        quantity,
        avgBuyPrice: price
      }
    });
};