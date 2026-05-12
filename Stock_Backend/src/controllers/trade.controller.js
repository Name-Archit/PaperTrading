const prisma = require("../config/db");
const stockService = require("../services/stock.service");

exports.buyStock = async (req, res) => {

  try {

    const userId = req.user.userId;

    const { symbol, quantity } = req.body;

    const stock = await stockService.getStockPrice(symbol);

    const currentPrice = parseFloat(stock.price);

    const totalCost = currentPrice * quantity;

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (user.balance < totalCost) {
      return res.status(400).json({
        message: "Insufficient balance"
      });
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        balance: {
          decrement: totalCost
        }
      }
    });

    const existingPortfolio =
      await prisma.portfolio.findFirst({
        where: {
          userId,
          stockSymbol: symbol
        }
      });

    if (existingPortfolio) {

      const newQty =
        existingPortfolio.quantity + quantity;

      const newAvgPrice =
        (
          existingPortfolio.avgBuyPrice *
          existingPortfolio.quantity +
          currentPrice * quantity
        ) / newQty;

      await prisma.portfolio.update({
        where: {
          id: existingPortfolio.id
        },
        data: {
          quantity: newQty,
          avgBuyPrice: newAvgPrice
        }
      });

    } else {

      await prisma.portfolio.create({
        data: {
          userId,
          stockSymbol: symbol,
          quantity,
          avgBuyPrice: currentPrice
        }
      });
    }

    await prisma.transaction.create({
      data: {
        userId,
        stockSymbol: symbol,
        quantity,
        price: currentPrice,
        total: totalCost,
        type: "BUY"
      }
    });

    res.json({
      message: "Stock bought successfully"
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
};

exports.sellStock = async (req, res) => {

  try {

    const userId = req.user.userId;

    const { symbol, quantity } = req.body;

    const portfolio =
      await prisma.portfolio.findFirst({
        where: {
          userId,
          stockSymbol: symbol
        }
      });

    if (!portfolio) {
      return res.status(400).json({
        message: "Stock not owned"
      });
    }

    if (portfolio.quantity < quantity) {
      return res.status(400).json({
        message: "Not enough shares"
      });
    }

    const stock =
      await stockService.getStockPrice(symbol);

    const currentPrice =
      parseFloat(stock.price);

    const totalValue =
      currentPrice * quantity;

    const pnl =
      (
        currentPrice -
        portfolio.avgBuyPrice
      ) * quantity;

    await prisma.user.update({
      where: { id: userId },
      data: {
        balance: {
          increment: totalValue
        }
      }
    });

    const remainingQty =
      portfolio.quantity - quantity;

    if (remainingQty === 0) {

      await prisma.portfolio.delete({
        where: {
          id: portfolio.id
        }
      });

    } else {

      await prisma.portfolio.update({
        where: {
          id: portfolio.id
        },
        data: {
          quantity: remainingQty
        }
      });
    }

    await prisma.transaction.create({
      data: {
        userId,
        stockSymbol: symbol,
        quantity,
        price: currentPrice,
        total: totalValue,
        type: "SELL",
        profitLoss: pnl
      }
    });

    res.json({
      message: "Stock sold successfully",
      pnl
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
};