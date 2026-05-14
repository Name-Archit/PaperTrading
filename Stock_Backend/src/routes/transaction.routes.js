const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require("../middlewares/auth.middleware");

const transactionController =
  require(
    "../controllers/transaction.controller"
  );

router.get(
  "/",
  authMiddleware,
  transactionController.getTransactions
);

module.exports = router;