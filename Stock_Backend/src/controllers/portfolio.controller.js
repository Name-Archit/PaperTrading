const portfolioService =
  require("../services/portfolio.service");

exports.getPortfolio =
  async (req, res) => {

    try {

      const data =
        await portfolioService
          .getPortfolioData(
            req.user.userId
          );

      res.json(data);

    } catch (err) {

      res.status(500).json({
        message: err.message
      });
    }
};