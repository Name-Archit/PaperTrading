const StockCard = ({ stock, bought }) => {
  return (
    <div className="premium-border bg-[#111111] sharp-border p-6 hover:border-[#C9A84C]/50 transition-all duration-300 cursor-pointer">

      <div className="flex items-center justify-between mb-5">

        <h3 className="text-[#C9A84C] tracking-widest uppercase text-sm">
          {stock.name}
        </h3>

        <span
          className={`text-xs font-mono ${
            stock.positive ? "text-[#C9A84C]" : "text-red-400"
          }`}
        >
          {bought ? stock.pnl : stock.change}
        </span>

      </div>

      {bought ? (
        <div className="space-y-3 text-sm text-gray-400 font-mono">

          <div className="flex justify-between">
            <span>Quantity</span>
            <span>{stock.quantity}</span>
          </div>

          <div className="flex justify-between">
            <span>Average</span>
            <span>{stock.avg}</span>
          </div>

          <div className="flex justify-between">
            <span>Current</span>
            <span>{stock.current}</span>
          </div>

        </div>
      ) : (
        <div className="space-y-4">

          <h2 className="text-3xl font-mono text-white">
            {stock.price}
          </h2>

          <div className="w-full h-px bg-[#C9A84C]/10"></div>

          <p className="text-xs tracking-[0.2em] uppercase text-gray-500">
            Live Market Feed
          </p>

        </div>
      )}

    </div>
  )
}

export default StockCard