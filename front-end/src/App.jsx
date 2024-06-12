import "../public/css/output-tailwind.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import NavbarAdmin from "./components/admin/navbarAdmin";
import NavbarOwner from "./components/owner/navbarOwner";
import Home from "./components/Home";
import AdminHome from "./components/admin/adminHome";
import OwnerHome from "./components/owner/ownerHome";
import InventarisAdmin from "./components/admin/inventarisAdmin";
import PelangganAdmin from "./components/admin/pelangganAdmin";
import InventarisOwner from "./components/owner/inventarisOwner";
import PelangganOwner from "./components/owner/pelangganOwner";
import LoginAdmin from "./components/admin/loginAdmin";
import LoginOwner from "./components/owner/loginOwner";

export default function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [userType, setUserType] = useState(localStorage.getItem("userType"));

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user);
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (userType) {
      localStorage.setItem("userType", userType);
    } else {
      localStorage.removeItem("userType");
    }
  }, [userType]);

  return (
    <Router>
      <div className="bg-black h-screen overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/loginAdmin"
            element={ 
              <LoginAdmin
                setUser={(user) => {
                  setUser(user);
                  setUserType("adminmalik");
                }}
              />
            }
          />
          <Route
            path="/loginOwner"
            element={
              <LoginOwner
                setUser={(user) => {
                  setUser(user);
                  setUserType("ownernuryati");
                }}
              />
            }
          />
          <Route
            path="/adminHome"
            element={
              user && userType === "adminmalik" ? (
                <AdminHome />
              ) : (
                <Navigate to="/loginAdmin" />
              )
            }
          />
          <Route
            path="/ownerHome"
            element={
              user && userType === "ownernuryati" ? (
                <OwnerHome />
              ) : (
                <Navigate to="/loginOwner" />
              )
            }
          />
          <Route
            path="/inventarisAdmin"
            element={
              user && userType === "adminmalik" ? (
                <InventarisAdmin />
              ) : (
                <Navigate to="/loginAdmin" />
              )
            }
          />
          <Route
            path="/pelangganAdmin"
            element={
              user && userType === "adminmalik" ? (
                <PelangganAdmin />
              ) : (
                <Navigate to="/loginAdmin" />
              )
            }
          />
          <Route
            path="/inventarisOwner"
            element={
              user && userType === "ownernuryati" ? (
                <InventarisOwner />
              ) : (
                <Navigate to="/loginOwner" />
              )
            }
          />
          <Route
            path="/pelangganOwner"
            element={
              user && userType === "ownernuryati" ? (
                <PelangganOwner />
              ) : (
                <Navigate to="/loginOwner" />
              )
            }
          />
        </Routes>
        {user && userType === "adminmalik" && (
          <NavbarAdmin user={user} setUser={setUser} />
        )}
        {user && userType === "ownernuryati" && (
          <NavbarOwner user={user} setUser={setUser} />
        )}
      </div>
    </Router>
  );
}
