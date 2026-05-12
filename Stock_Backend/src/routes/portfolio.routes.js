const express = require("express");

const router = express.Router();

const portfolioController =
  require("../controllers/portfolio.controller");

const authMiddleware =
  require("../middlewares/auth.middleware");

router.get(
  "/",
  authMiddleware,
  portfolioController.getPortfolio
);

module.exports = router;