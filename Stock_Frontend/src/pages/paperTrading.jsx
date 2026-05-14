import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import BalanceBar from "../components/BalanceBar"
import StockDashboard from "../components/StockDashboard"
import ManageDemat from "../components/ManageDemat"

const PaperTrading = () => {
  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white overflow-x-hidden">

      <Navbar />

      <BalanceBar />

      <StockDashboard />

      <ManageDemat />

      <Footer />

    </div>
  )
}

export default PaperTrading