const features = [
  {
    icon: "trending_up",
    title: "Real Market Data",
    desc: "Track Nifty 50, global indices and stock movements updated live."
  },
  {
    icon: "target",
    title: "Paper Trading",
    desc: "Trade with virtual money. Real prices. Real lessons. Zero risk."
  },
  {
    icon: "psychology",
    title: "Smart Analytics",
    desc: "Understand your trading patterns. Learn what works and why."
  }
]

const Features = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 md:px-6 py-20 grid md:grid-cols-3 gap-6">
      {features.map((item, index) => (
        <div
          key={index}
          className="premium-border bg-[#111111] p-12 sharp-border flex flex-col gap-6 hover:border-[#C9A84C] transition-all duration-500"
        >
          <span className="material-symbols-outlined text-[#C9A84C] text-4xl">
            {item.icon}
          </span>

          <h3 className="tracking-widest uppercase text-[#C9A84C]">
            {item.title}
          </h3>

          <p className="text-gray-400 leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </section>
  )
}

export default Features