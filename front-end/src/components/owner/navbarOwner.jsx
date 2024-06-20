import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../public/css/custom.css";

export default function NavbarOwner({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <nav className="bg-gray-800 p-4 fixed w-full top-0 z-20">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-amber-500 mx-2 my-2 lg:my-0 font-semibold">
            Halo, {user}
          </span>
          <Link
            to="/ownerHome"
            className="text-amber-500 mx-2 my-2 lg:my-0 font-semibold underline-animation"
          >
            Beranda
          </Link>
          <div className="block lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-amber-500 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex flex-row lg:items-center lg:space-x-4">
            <Link
              to="/inventarisOwner"
              className="text-amber-500 mx-2 my-2 lg:my-0 font-semibold underline-animation"
            >
              Inventaris
            </Link>
            <Link
              to="/pelangganOwner"
              className="text-amber-500 mx-2 my-2 lg:my-0 font-semibold underline-animation"
            >
              Pelanggan
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-2 py-1 rounded transition duration-300 ease-in-out hover:scale-110 hover:bg-red-600 hover:text-black"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div
        className={`lg:hidden fixed w-full bg-gray-700 top-16 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-y-0 " : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto my-0 flex flex-col items-center">
          <Link
            to="/inventarisOwner"
            className="text-amber-500 mx-2 my-4 font-semibold hover:font-bold"
            onClick={toggleMenu}
          >
            Inventaris
          </Link>
          <Link
            to="/pelangganOwner"
            className="text-amber-500 mx-2 my-2 font-semibold hover:font-bold"
            onClick={toggleMenu}
          >
            Pelanggan
          </Link>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-2 py-1 mx-2 my-4 rounded transition duration-300 ease-in-out hover:scale-110 hover:bg-red-600 hover:text-black"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
