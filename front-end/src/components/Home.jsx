import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500">
        <h1 className="p-3 text-3xl font-bold mb-8 text-center">
          Aplikasi Inventaris dan Loyalitas Pelanggan Toko Kelontong Ibu Nuryati
        </h1>
        <div className="flex space-x-4">
          <Link
            to="/loginAdmin"
            className="bg-white font-semibold p-6 rounded shadow-md w-40 text-center transition duration-300 ease-in-out hover:scale-95 hover:bg-blue-500"
          >
            Login sebagai Admin
          </Link>
          <Link
            to="/loginOwner"
            className="bg-white font-semibold p-6 rounded shadow-md w-40 text-center transition duration-300 ease-in-out hover:scale-95 hover:bg-blue-500"
          >
            Login sebagai Owner
          </Link>
        </div>
      </div>
    </>
  );
}
