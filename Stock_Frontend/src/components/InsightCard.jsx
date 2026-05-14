const InsightCard = () => {
  return (
    <div className="premium-border bg-[#111111] sharp-border p-8 border-l-4 border-l-[#C9A84C]">

      <div className="flex items-start gap-4">

        <span className="material-symbols-outlined text-[#C9A84C]">
          lightbulb
        </span>

        <div>

          <h4 className="text-[#C9A84C] mb-2 uppercase tracking-widest">
            Resilience Insight
          </h4>

          <p className="text-gray-400 leading-relaxed">
            You haven't touched the Energy sector.
            Diversification builds resilience against market volatility.
            Consider hedging your IT heavy portfolio.
          </p>

        </div>
      </div>
    </div>
  )
}

export default InsightCard