import { portfolioData } from "../data/portfolioData"

const PortfolioTable = () => {
  return (
    <section className="bg-[#0A0A0A] py-20 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">

        <div className="mb-12">
          <h2 className="text-[#C9A84C] tracking-widest uppercase mb-2 text-3xl font-serif">
            Your Portfolio, Simulated.
          </h2>

          <div className="w-24 h-px bg-[#C9A84C]" />
        </div>

        <div className="premium-border bg-[#111111] sharp-border overflow-hidden">

          <div className="p-4 bg-[#1A1A1A] flex justify-between items-center border-b border-[#C9A84C]/10">
            <span className="tracking-widest uppercase text-gray-400">
              Active Positions
            </span>

            <span className="font-mono text-[#C9A84C]">
              LIVE FEED: ACTIVE
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">

              <thead>
                <tr className="border-b border-[#C9A84C]/10 bg-[#151515]">

                  <th className="p-6 text-[#C9A84C] tracking-widest">
                    STOCK
                  </th>

                  <th className="p-6 text-[#C9A84C] tracking-widest text-right">
                    BUY PRICE
                  </th>

                  <th className="p-6 text-[#C9A84C] tracking-widest text-right">
                    CURRENT
                  </th>

                  <th className="p-6 text-[#C9A84C] tracking-widest text-right">
                    P&L %
                  </th>

                </tr>
              </thead>

              <tbody className="font-mono">

                {portfolioData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-800 hover:bg-[#151515] transition-colors"
                  >

                    <td className="p-6 tracking-wider">
                      {item.stock}
                    </td>

                    <td className="p-6 text-right text-gray-400">
                      {item.buy}
                    </td>

                    <td className="p-6 text-right">
                      {item.current}
                    </td>

                    <td
                      className={`p-6 text-right ${
                        item.positive
                          ? "text-[#C9A84C]"
                          : "text-red-400"
                      }`}
                    >
                      {item.pnl}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PortfolioTable