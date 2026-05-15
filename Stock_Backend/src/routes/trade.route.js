const express =
  require("express");

const router =
  express.Router();

const tradeController =
  require(
    "../controllers/trade.controller"
  );

const authMiddleware =
  require(
    "../middlewares/auth.middleware"
  );

/*
|--------------------------------------------------------------------------
| Buy Stock
|--------------------------------------------------------------------------
*/

router.post(
  "/buy",

  authMiddleware,

  tradeController.buyStock
);

/*
|--------------------------------------------------------------------------
| Sell Stock
|--------------------------------------------------------------------------
*/

router.post(
  "/sell",

  authMiddleware,

  tradeController.sellStock
);

module.exports = router;