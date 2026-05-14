import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-neutral-950/90 backdrop-blur-md border-b border-[#C9A84C]/30 flex justify-between items-center px-6 md:px-8 h-14">
      <div className="text-xl font-bold tracking-widest text-[#C9A84C] uppercase font-serif">
        Arc + Nir
      </div>

      <div className="hidden md:flex gap-8">
        <NavLink
          className="text-[#C9A84C] border-b border-[#C9A84C] pb-1 font-serif tracking-widest uppercase text-xs"
          to="/"
        >
          Dashboard
        </NavLink>

        <NavLink
          className="text-[#C9A84C]/60 font-serif tracking-widest uppercase text-xs hover:text-[#C9A84C]"
          to="/paper-trading"
        >
          Paper Trade
        </NavLink>

        <NavLink
          className="text-[#C9A84C]/60 font-serif tracking-widest uppercase text-xs hover:text-[#C9A84C]"
          to="/analytics"
        >
          Analytics
        </NavLink>
      </div>

      <button className="font-serif tracking-widest uppercase text-xs text-[#C9A84C] border border-[#C9A84C]/50 px-6 py-2 hover:bg-[#C9A84C] hover:text-neutral-950 transition-all">
        Access Terminal
      </button>
    </nav>
  )
}

export default Navbar