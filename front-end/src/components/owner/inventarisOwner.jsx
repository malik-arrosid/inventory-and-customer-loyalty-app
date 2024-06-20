import { useState, useEffect } from "react";
import axios from "axios";

export default function InventarisOwner() {
  const [barangs, setBarangs] = useState([]);
  const [showErrorFormatSearchModal, setShowErrorFormatSearchModal] =
    useState(false);
  const [errorFormatSearchMessage, setErrorFormatSearchMessage] =
    useState(false);
  const [query, setQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    fetchBarangs();
  }, []);

  const fetchBarangs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/inventaris");
      setBarangs(response.data);
      setSearchActive(false);
    } catch (error) {
      console.error("There was an error fetching the inventory!", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) {
      setErrorFormatSearchMessage(
        "Format Pencarian Barang yang Diinputkan Salah!"
      );
      setShowErrorFormatSearchModal(true);
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/api/inventaris/search?nama_barang=${query}`
      );
      setBarangs(response.data);
      setSearchActive(true);
    } catch (error) {
      console.error("There was an error searching for the item!", error);
    }
  };

  const handleBack = () => {
    setQuery("");
    fetchBarangs();
  };

  return (
    <div className="container mx-auto mt-24 text-center">
      <form
        onSubmit={handleSearch}
        className="mb-4 flex justify-center space-x-2"
      >
        {searchActive && (
          <button
            type="button"
            className="bg-gray-500 text-white p-2 rounded transition duration-300 ease-in-out hover:scale-90 mr-2"
            onClick={handleBack}
          >
            🔙 Kembali
          </button>
        )}
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Cari Barang 🔍"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-2 transition duration-300 ease-in-out hover:scale-90"
        >
          🔍
        </button>
      </form>
      <div className="lg:flex justify-center">
        <table className="max-w-full bg-white mt-4 text-center">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-green-500 border border-black">
                Nama Barang
              </th>
              <th className="py-2 px-4 bg-green-500 border border-black">
                Stok
              </th>
              <th className="py-2 px-4 bg-green-500 border border-black">
                Kategori Stok
              </th>
              <th className="py-2 px-4 bg-green-500 border border-black">
                Kategori Barang
              </th>
              <th className="py-2 px-4 bg-green-500 border border-black">
                Harga Satuan
              </th>
            </tr>
          </thead>
          <tbody className="font-semibold">
            {barangs.map((barang) => (
              <tr key={barang.id_barang}>
                <td className="border border-black px-4 py-2">
                  {barang.nama_barang}
                </td>
                <td className="border border-black px-4 py-2">{barang.stok}</td>
                <td className="border border-black px-4 py-2">
                  {barang.kategori_stok}
                </td>
                <td className="border border-black px-4 py-2">
                  {barang.kategori_barang}
                </td>
                <td className="border border-black px-4 py-2">
                  {barang.harga}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showErrorFormatSearchModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-4 rounded shadow-lg w-2/4 border border-black text-center">
              <h2 className="text-lg mb-4 text-red-600">
                {errorFormatSearchMessage} ❌
              </h2>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:scale-110"
                onClick={() => setShowErrorFormatSearchModal(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
