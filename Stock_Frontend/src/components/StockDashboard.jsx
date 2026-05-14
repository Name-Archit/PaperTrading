import { useState } from "react"
import { topStocks, boughtStocks } from "../data/stock"
import StockCard from "./StockCard"

const StockDashboard = () => {

  const [activeTab, setActiveTab] = useState("top")

  return (
    <section className="container-custom py-10">

      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#C9A84C]/60 mb-2">
            Market Dashboard
          </p>

          <h2 className="text-3xl font-serif text-[#C9A84C]">
            Live Trading Terminal
          </h2>
        </div>

        <div className="flex items-center gap-4">

          <button
            onClick={() => setActiveTab("top")}
            className={`px-6 py-3 uppercase text-xs tracking-[0.2em] border transition-all duration-300 ${
              activeTab === "top"
                ? "bg-[#C9A84C] text-black border-[#C9A84C]"
                : "border-[#C9A84C]/30 text-[#C9A84C]"
            }`}
          >
            Top Stocks
          </button>

          <button
            onClick={() => setActiveTab("bought")}
            className={`px-6 py-3 uppercase text-xs tracking-[0.2em] border transition-all duration-300 ${
              activeTab === "bought"
                ? "bg-[#C9A84C] text-black border-[#C9A84C]"
                : "border-[#C9A84C]/30 text-[#C9A84C]"
            }`}
          >
            Your Bought Stocks
          </button>

        </div>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {(activeTab === "top"
          ? topStocks
          : boughtStocks
        ).map((stock, index) => (
          <StockCard
            key={index}
            stock={stock}
            bought={activeTab === "bought"}
          />
        ))}

      </div>

    </section>
  )
}

export default StockDashboard