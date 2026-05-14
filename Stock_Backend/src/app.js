const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

/*
|--------------------------------------------------------------------------
| Route Imports
|--------------------------------------------------------------------------
*/

const authRoutes =
  require("./routes/auth.routes");

const tradeRoutes =
  require("./routes/trade.routes");

const portfolioRoutes =
  require("./routes/portfolio.routes");

const stockRoutes =
  require("./routes/stock.routes");

const transactionRoutes =
  require("./routes/transaction.routes");

/*
|--------------------------------------------------------------------------
| Middleware Imports
|--------------------------------------------------------------------------
*/

const logger =
  require("./utils/logger");

const limiter =
  require("./middlewares/rateLimiter");

const errorMiddleware =
  require("./middlewares/error.middleware");

/*
|--------------------------------------------------------------------------
| App Initialization
|--------------------------------------------------------------------------
*/

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middlewares
|--------------------------------------------------------------------------
*/

// Security headers
app.use(helmet());

// Request logger
app.use(logger);

// Rate limiter
app.use(limiter);

// JSON parser
app.use(express.json());

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

/*
|--------------------------------------------------------------------------
| Health Check Route
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {

  res.json({
    success: true,
    message:
      "Paper Trading API Running"
  });

});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/trade",
  tradeRoutes
);

app.use(
  "/api/portfolio",
  portfolioRoutes
);

app.use(
  "/api/stocks",
  stockRoutes
);

app.use(
  "/api/transactions",
  transactionRoutes
);

/*
|--------------------------------------------------------------------------
| 404 Route Handler
|--------------------------------------------------------------------------
*/

app.use((req, res) => {

  res.status(404).json({
    success: false,
    message: "Route not found"
  });

});

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use(errorMiddleware);

/*
|--------------------------------------------------------------------------
| Export App
|--------------------------------------------------------------------------
*/

module.exports = app;