const BalanceBar = () => {
  return (
    <section className="container-custom pt-24 pb-8">
      <div className="premium-border bg-[#111111] sharp-border h-20 px-8 flex items-center justify-between">

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#C9A84C]/60 mb-1">
            Paper Money
          </p>

          <h2 className="text-2xl font-serif text-[#C9A84C] tracking-wider">
            Trading Balance
          </h2>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C9A84C]/60 mb-1">
            Available Funds
          </p>

          <h2 className="text-3xl font-mono text-[#C9A84C]">
            $1000
          </h2>
        </div>

      </div>
    </section>
  )
}

export default BalanceBar