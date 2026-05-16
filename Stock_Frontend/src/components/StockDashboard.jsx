import { useState } from "react"
import { boughtStocks } from "../data/stock"
import StockCard from "./StockCard"
import { useStocks } from "../context/StockContext"

const StockDashboard = () => {

  const [activeTab, setActiveTab] = useState("top")

  const { topStocks, loading, error, lastFetched, marketStatus } = useStocks()

  const LoadingSkeleton = () => (
    <div className="premium-border bg-[#111111] sharp-border p-6 animate-pulse">
      <div className="flex items-center justify-between mb-5">
        <div className="h-3 w-16 bg-[#C9A84C]/20 rounded"></div>
        <div className="h-3 w-10 bg-[#C9A84C]/10 rounded"></div>
      </div>
      <div className="h-8 w-24 bg-[#C9A84C]/10 rounded mb-4"></div>
      <div className="w-full h-px bg-[#C9A84C]/10 mb-4"></div>
      <div className="h-3 w-28 bg-[#C9A84C]/10 rounded"></div>
    </div>
  )

  return (

    <section className="container-custom py-10">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">

        <div>

          <p className="text-xs uppercase tracking-[0.3em] text-[#C9A84C]/60 mb-2">
            Market Dashboard
          </p>

          <h2 className="text-3xl font-serif text-[#C9A84C]">
            Live Trading Terminal
          </h2>

          {lastFetched && (
            <p className="text-xs text-[#C9A84C]/30 tracking-widest mt-1">
              Updated {lastFetched.toLocaleTimeString()}
            </p>
          )}

        </div>

        {/* TABS */}

        <div className="flex items-center gap-4">

          <button
            onClick={() => setActiveTab("top")}
            className={`
              px-6 py-3 uppercase text-xs
              tracking-[0.2em] border
              transition-all duration-300
              ${activeTab === "top"
                ? "bg-[#C9A84C] text-black border-[#C9A84C]"
                : "border-[#C9A84C]/30 text-[#C9A84C]"
              }
            `}
          >
            Top Stocks
          </button>

          <button
            onClick={() => setActiveTab("bought")}
            className={`
              px-6 py-3 uppercase text-xs
              tracking-[0.2em] border
              transition-all duration-300
              ${activeTab === "bought"
                ? "bg-[#C9A84C] text-black border-[#C9A84C]"
                : "border-[#C9A84C]/30 text-[#C9A84C]"
              }
            `}
          >
            Your Bought Stocks
          </button>

        </div>

      </div>

      {/* MARKET STATUS BANNER */}

      {activeTab === "top" && !loading && marketStatus === "Closed" && (
        <div className="mb-8 border border-red-500/30 bg-red-500/5 px-6 py-3 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <p className="text-red-400 text-xs uppercase tracking-[0.2em]">
            Market Closed — Showing Last Close Prices
          </p>
        </div>
      )}

      {activeTab === "top" && !loading && marketStatus === "Open" && (
        <div className="mb-8 border border-green-500/30 bg-green-500/5 px-6 py-3 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <p className="text-green-400 text-xs uppercase tracking-[0.2em]">
            Market Open — Live Prices
          </p>
        </div>
      )}

      {/* STOCK GRID */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* LOADING STATE */}

        {activeTab === "top" && loading && (
          Array(6).fill(0).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))
        )}

        {/* ERROR STATE */}

        {activeTab === "top" && !loading && error && (
          <div className="col-span-3 text-center py-20">
            <p className="text-red-400 tracking-widest uppercase text-sm">
              {error}
            </p>
            <p className="text-gray-600 text-xs mt-2 tracking-widest">
              Make sure your backend server is running
            </p>
          </div>
        )}

        {/* EMPTY STATE */}

        {activeTab === "top" && !loading && !error && topStocks.length === 0 && (
          <div className="col-span-3 text-center py-20">
            <p className="text-[#C9A84C]/40 tracking-widest uppercase text-sm">
              No stocks available
            </p>
          </div>
        )}

        {/* STOCK CARDS */}

        {!loading && (
          (activeTab === "top" ? topStocks : boughtStocks)
            .map((stock, index) => (
              <StockCard
                key={index}
                stock={stock}
                bought={activeTab === "bought"}
              />
            ))
        )}

      </div>

    </section>
  )
}

export default StockDashboard