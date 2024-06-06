import "../public/css/output-tailwind.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Inventaris from "./components/Inventaris";
import Pelanggan from "./components/Pelanggan";
import LaporanPenjualan from "./components/LaporanPenjualan";

export default function App() {
  return (
    <Router>
      <div className="bg-black h-screen overflow-y-auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventaris" element={<Inventaris />} />
          <Route path="/pelanggan" element={<Pelanggan />} />
          <Route path="/laporanPenjualan" element={<LaporanPenjualan />} />
        </Routes>
      </div>
    </Router>
  );
}
