const ManageDemat = () => {
  return (
    <section className="container-custom py-16">

      <div className="premium-border sharp-border bg-linear-to-r from-[#111111] to-[#181818] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">

        <div>

          <p className="text-xs uppercase tracking-[0.3em] text-[#C9A84C]/60 mb-3">
            Trading Controls
          </p>

          <h2 className="text-4xl font-serif text-[#C9A84C] mb-4">
            Manage Demat
          </h2>

          <p className="max-w-xl text-gray-400 leading-relaxed">
            Buy stocks, sell positions, monitor portfolio allocations,
            and manage your complete paper trading experience from a
            single institutional-grade dashboard.
          </p>

        </div>

        <button className="border border-[#C9A84C]/50 text-[#C9A84C] px-10 py-5 uppercase tracking-[0.3em] hover:bg-[#C9A84C] hover:text-black transition-all duration-500 whitespace-nowrap">
          Open Trading Terminal
        </button>

      </div>

    </section>
  )
}

export default ManageDemat