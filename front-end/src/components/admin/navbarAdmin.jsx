import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../public/css/custom.css";

export default function Navbar({ user, setUser }) {
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
            to="/adminHome"
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
              to="/inventarisAdmin"
              className="text-amber-500 mx-2 my-2 lg:my-0 font-semibold underline-animation "
            >
              Inventaris
            </Link>
            <Link
              to="/pelangganAdmin"
              className="text-amber-500 mx-2 my-2 lg:my-0 font-semibold underline-animation"
            >
              Pelanggan
            </Link>
            <button
              onClick={logout}
              className="text-amber-500 mx-2 my-2 lg:my-0 font-semibold underline-animation"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className="bg-gray-700 lg:hidden mt-5 fixed w-full top-10 z-20">
          <div className="container mx-auto my-0 flex flex-col items-center">
            <Link
              to=""
              className="text-amber-500 mx-2 my-2 font-semibold hover:font-bold"
              onClick={toggleMenu}
            >
              Inventaris
            </Link>
            <Link
              to=""
              className="text-amber-500 mx-2 my-2 font-semibold hover:font-bold"
              onClick={toggleMenu}
            >
              Pelanggan
            </Link>
            <button
              onClick={logout}
              className="text-amber-500 mx-2 my-2 font-semibold hover:font-bold"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
