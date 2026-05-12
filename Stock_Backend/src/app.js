const express = require("express");
const cors = require("cors");

const authRoutes =
  require("./routes/auth.routes");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/auth", authRoutes);

module.exports = app;

const tradeRoutes =
  require("./routes/trade.routes");

app.use("/api/trade", tradeRoutes);

app.use(
  "/api/portfolio",
  portfolioRoutes
);

app.use("/api/stocks", stockRoutes);