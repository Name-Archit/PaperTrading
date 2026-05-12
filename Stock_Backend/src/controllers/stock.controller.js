const stockService = require("../services/stock.service");

exports.getPrice = async (req, res) => {
  try {
    const { symbol } = req.params;

    const data = await stockService.getStockPrice(symbol);

    res.json(data);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};