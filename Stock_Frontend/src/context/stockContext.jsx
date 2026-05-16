import { createContext, useContext, useEffect, useState } from "react"

const StockContext = createContext()

export const StockProvider = ({ children }) => {

  const [topStocks, setTopStocks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastFetched, setLastFetched] = useState(null)
  const [marketStatus, setMarketStatus] = useState("Unknown")

  const fetchStocks = async () => {

    try {

      setLoading(true)
      setError(null)

      const response = await fetch(
        "http://localhost:5000/api/stocks/top-stocks"
      )

      const data = await response.json()

      if (data.success) {

        const formattedStocks = data.stocks.map((stock) => ({
          name: stock.symbol || "UNKNOWN",
          price: stock.price
            ? `$${parseFloat(stock.price).toFixed(2)}`
            : "N/A",
          change: stock.change
            ? `${parseFloat(stock.change).toFixed(2)}%`
            : "N/A",
          positive: stock.positive,
          isRealTime: stock.isRealTime || false,
          marketStatus: stock.marketStatus || "Unknown",
          lastTradeDate: stock.lastTradeDate || null
        }))

        setTopStocks(formattedStocks)
        setLastFetched(new Date())

        /*
        |--------------------------------------------------------------------------
        | Set Global Market Status from First Stock
        |--------------------------------------------------------------------------
        */

        if (data.stocks.length > 0) {
          setMarketStatus(data.stocks[0]?.marketStatus || "Unknown")
        }

      } else {
        setError("Failed to fetch stocks")
      }

    } catch (err) {
      console.log(err)
      setError("Unable to connect to server")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    fetchStocks()

    const interval = setInterval(() => {
      fetchStocks()
    }, 60000)

    window.__stockInterval = interval

    return () => clearInterval(interval)

  }, [])

  const clearStocks = () => {
    setTopStocks([])
    setLastFetched(null)
    setMarketStatus("Unknown")
    clearInterval(window.__stockInterval)
  }

  return (
    <StockContext.Provider value={{
      topStocks,
      loading,
      error,
      lastFetched,
      marketStatus,
      clearStocks
    }}>
      {children}
    </StockContext.Provider>
  )
}

export const useStocks = () => useContext(StockContext)