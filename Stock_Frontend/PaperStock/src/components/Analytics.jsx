const Analytics = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 md:px-6 py-20 grid md:grid-cols-1 lg:grid-cols-2 gap-12 items-center">

      <div className="relative aspect-square max-w-md mx-auto">

        <div className="absolute inset-0 rounded-full border-12 border-[#C9A84C]/5"></div>

        <svg
          className="transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            fill="transparent"
            r="40"
            stroke="#C9A84C"
            strokeDasharray="150 101"
            strokeWidth="12"
          />

          <circle
            cx="50"
            cy="50"
            fill="transparent"
            r="40"
            stroke="#8B8B8B"
            strokeDasharray="50 201"
            strokeDashoffset="-150"
            strokeWidth="12"
          />

          <circle
            cx="50"
            cy="50"
            fill="transparent"
            r="40"
            stroke="#503d00"
            strokeDasharray="38 213"
            strokeDashoffset="-200"
            strokeWidth="12"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="uppercase tracking-widest text-gray-400 mb-1">
            TOTAL GOLD
          </span>

          <span className="text-3xl text-[#C9A84C] font-mono">
            $142.5K
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-12">

        <div>

          <h2 className="text-[#C9A84C] tracking-widest uppercase mb-6 text-3xl font-serif">
            Diversification Analytics
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#C9A84C]" />
              <span className="text-xs tracking-widest">
                IT - 60%
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#8B8B8B]" />
              <span className="text-xs tracking-widest">
                BANKING - 20%
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#503d00]" />
              <span className="text-xs tracking-widest">
                PHARMA - 15%
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#1A1A1A] border border-gray-700" />
              <span className="text-xs tracking-widest">
                ENERGY - 5%
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Analytics