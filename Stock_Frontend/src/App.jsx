import { Routes, Route } from "react-router-dom"

import HomePage from "./pages/HomePage"
import PaperTrading from "./pages/paperTrading"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/paper-trading"
        element={<PaperTrading />}
      />
    </Routes>
  )
}

export default App