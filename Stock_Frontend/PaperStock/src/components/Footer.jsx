const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] w-full py-16 border-t border-[#C9A84C]/20">

      <div className="flex flex-col items-center gap-8 container-custom">

        <div className="text-lg font-bold tracking-[0.2em] text-[#C9A84C] uppercase font-serif">
          FINANCE
        </div>

        <div className="flex gap-6 flex-wrap justify-center">

          <a
            className="text-[10px] tracking-widest uppercase text-neutral-500 hover:text-[#C9A84C]"
            href="#"
          >
            Institutional Access
          </a>

          <a
            className="text-[10px] tracking-widest uppercase text-neutral-500 hover:text-[#C9A84C]"
            href="#"
          >
            Privacy Protocol
          </a>

          <a
            className="text-[10px] tracking-widest uppercase text-neutral-500 hover:text-[#C9A84C]"
            href="#"
          >
            Terms of Service
          </a>

        </div>

        <p className="text-[10px] tracking-widest uppercase text-[#C9A84C] opacity-80">
          Built for students. Inspired by markets.
        </p>

      </div>
    </footer>
  )
}

export default Footer