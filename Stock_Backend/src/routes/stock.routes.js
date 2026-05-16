const express =
  require("express")

const router =
  express.Router()

const stockController =
  require(
    "../controllers/stock.controller"
  )

router.get(
  "/top-stocks",

  stockController.getTopStocks
)

module.exports =
  router