import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Features from "../components/Features"
import PortfolioTable from "../components/portfolioTable"
import Analytics from "../components/Analytics"
import InsightCard from "../components/InsightCard"
import Footer from "../components/Footer"

const HomePage = () => {
  return (
    <div className="bg-[#0A0A0A] text-white overflow-x-hidden">

      <Navbar />

      <Hero />

      <Features />

      <PortfolioTable />

      <Analytics />

      <div className="container-custom pb-32">
        <InsightCard />
      </div>

      <Footer />

    </div>
  )
}

export default HomePage