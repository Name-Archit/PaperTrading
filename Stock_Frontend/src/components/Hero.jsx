const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden skyline-bg px-4 md:px-6">
      <h1 className="text-5xl md:text-7xl tracking-widest text-[#C9A84C] leading-none mb-6 font-serif">
        Arc + Nir
      </h1>

      <p className="text-gray-400 max-w-xl font-medium tracking-widest mb-12">
        Investment Banking | Wealth Management | Trading | Financial Advisory
      </p>

      <button className="premium-border sharp-border px-10 py-4 uppercase tracking-widest text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black transition-all duration-500">
        Start Learning
      </button>
    </section>
  )
}

export default Hero 