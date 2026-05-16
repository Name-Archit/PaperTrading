const axios = require("axios")

const symbols = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "TSLA",
  "META"
]

/*
|--------------------------------------------------------------------------
| Server Side Cache — Stores last fetch result
| Prevents hitting external API on every request
|--------------------------------------------------------------------------
*/

let cache = {
  data: null,
  lastFetched: null
}

const CACHE_DURATION = 60 * 1000 // 1 minute in ms

exports.getTopStocks = async (req, res) => {

  try {

    /*
    |--------------------------------------------------------------------------
    | Return Cached Data if Less Than 1 Minute Old
    |--------------------------------------------------------------------------
    */

    const now = Date.now()

    if (
      cache.data &&
      cache.lastFetched &&
      now - cache.lastFetched < CACHE_DURATION
    ) {

      console.log("Returning cached stock data")

      return res.json({
        success: true,
        stocks: cache.data,
        cached: true
      })
    }

    console.log("Fetching fresh stock data...")

    const results = []

    /*
    |--------------------------------------------------------------------------
    | Batch Fetching — 4 stocks at a time
    |--------------------------------------------------------------------------
    */

    for (let i = 0; i < symbols.length; i += 4) {

      const batch = symbols.slice(i, i + 4)

      const batchResults = await Promise.all(

        batch.map(async (symbol) => {

          try {

            const response = await axios.get(
              `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/quote`,
              {
                params: {
                  ticker: symbol,
                  type: "STOCKS"
                },
                headers: {
                  "x-rapidapi-key": process.env.RAPID_API_KEY,
                  "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com"
                }
              }
            )

            const data = response.data?.body

            if (!data) {
              return {
                symbol,
                price: null,
                change: null,
                positive: false,
                isRealTime: false,
                marketStatus: "Unknown",
                lastTradeDate: null
              }
            }

            /*
            |--------------------------------------------------------------
            | Clean Price — Remove $ sign for parsing
            |--------------------------------------------------------------
            */

            const rawPrice =
              data.primaryData?.lastSalePrice
                ?.replace("$", "")
                .replace(",", "") || null

            /*
            |--------------------------------------------------------------
            | Clean Change — Remove % and + sign for parsing
            |--------------------------------------------------------------
            */

            const rawChange =
              data.primaryData?.percentageChange
                ?.replace("%", "")
                .replace("+", "") || null

            return {

              symbol,

              /*
              |------------------------------------------------------------
              | Current Price
              |------------------------------------------------------------
              */

              price: rawPrice || null,

              /*
              |------------------------------------------------------------
              | Percentage Change
              |------------------------------------------------------------
              */

              change: rawChange || null,

              /*
              |------------------------------------------------------------
              | Positive / Negative via deltaIndicator
              |------------------------------------------------------------
              */

              positive:
                data.primaryData?.deltaIndicator === "up",

              /*
              |------------------------------------------------------------
              | Is Real Time — false on weekends and after hours
              |------------------------------------------------------------
              */

              isRealTime:
                data.primaryData?.isRealTime || false,

              /*
              |------------------------------------------------------------
              | Market Status — "Open" or "Closed"
              |------------------------------------------------------------
              */

              marketStatus:
                data.marketStatus || "Unknown",

              /*
              |------------------------------------------------------------
              | Last Trade Date — when price was last updated
              |------------------------------------------------------------
              */

              lastTradeDate:
                data.primaryData?.lastTradeTimestamp || null
            }

          } catch (err) {

            console.log(`Failed for ${symbol}:`, err.message)

            return {
              symbol,
              price: null,
              change: null,
              positive: false,
              isRealTime: false,
              marketStatus: "Unknown",
              lastTradeDate: null
            }
          }
        })
      )

      results.push(...batchResults)

      if (i + 4 < symbols.length) {
        await new Promise((resolve) =>
          setTimeout(resolve, 2000)
        )
      }
    }

    /*
    |--------------------------------------------------------------------------
    | Save to Cache
    |--------------------------------------------------------------------------
    */

    cache.data = results
    cache.lastFetched = Date.now()

    console.log("Fresh data fetched and cached")

    res.json({
      success: true,
      stocks: results,
      cached: false
    })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}