import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage"
import PaperTrading from "./pages/paperTrading"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/paper-trading"
        element={
          <ProtectedRoute>
            <PaperTrading />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App