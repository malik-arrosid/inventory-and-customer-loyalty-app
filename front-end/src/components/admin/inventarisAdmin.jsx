import { useState, useEffect } from "react";
import axios from "axios";

export default function InventarisAdmin() {
  const [barangs, setBarangs] = useState([]);
  const [newBarang, setNewBarang] = useState({
    nama_barang: "",
    stok: "",
    kategori_stok: "",
    kategori_barang: "",
    harga: "",
  });
  const [editBarang, setEditBarang] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showErrorAddModal, setShowErrorAddModal] = useState(false);
  const [showErrorFormatSearchModal, setShowErrorFormatSearchModal] =
    useState(false);
  const [errorFormatSearchMessage, setErrorFormatSearchMessage] =
    useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
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

  const handleAdd = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/inventaris",
        newBarang
      );
      setBarangs([...barangs, response.data]);
      setNewBarang({
        nama_barang: "",
        stok: "",
        kategori_stok: "",
        kategori_barang: "",
        harga: "",
      });
      setShowAddModal(false);
    } catch (error) {
      console.error("There was an error adding the item!", error);
      setShowErrorAddModal(true);
    }
  };

  const handleEdit = async (id_barang) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/inventaris/${id_barang}`,
        editBarang
      );
      setBarangs(
        barangs.map((barang) =>
          barang.id_barang === id_barang ? response.data : barang
        )
      );
      setEditBarang(null);
      setShowEditModal(false);
    } catch (error) {
      console.error("There was an error updating the item!", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/inventaris/${itemToDelete}`
      );
      setBarangs(barangs.filter((barang) => barang.id_barang !== itemToDelete));
      setShowDeleteModal(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("There was an error deleting the item!", error);
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
      console.error("There was an error fetching the search results!", error);
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
      <button
        className="bg-green-500 font-semibold text-black px-4 py-2 rounded transition duration-300 ease-in-out hover:scale-110"
        onClick={() => setShowAddModal(true)}
      >
        Tambah Barang
      </button>
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
              <th className="py-2 px-4 bg-green-500 border border-black">
                Tindakan
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
                <td className="border border-black px-4 py-2 text-center">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded transition duration-300 ease-in-out hover:scale-110"
                    onClick={() => {
                      setEditBarang(barang);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <span className="mx-2 text-white">space</span>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded transition duration-300 ease-in-out hover:scale-110"
                    onClick={() => {
                      setItemToDelete(barang.id_barang);
                      setShowDeleteModal(true);
                    }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddModal && (
        <div className="mt-8 fixed inset-0 overflow-y-auto backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-4 rounded shadow-lg w-auto border border-black">
              <h2 className="text-lg mb-4 font-semibold text-center">
                Tambah Barang
              </h2>
              <label htmlFor="nama-barang" className="block text-start">
                Nama Barang
              </label>
              <input
                id="nama-barang"
                type="text"
                placeholder="Nama Barang"
                value={newBarang.nama_barang}
                onChange={(e) =>
                  setNewBarang({ ...newBarang, nama_barang: e.target.value })
                }
                className="border border-black px-4 py-2 mb-4 w-full"
              />
              <label htmlFor="stok" className="block text-start">
                Stok
              </label>
              <input
                id="stok"
                type="number"
                placeholder="Stok"
                value={newBarang.stok}
                onChange={(e) =>
                  setNewBarang({ ...newBarang, stok: e.target.value })
                }
                className="border border-black px-4 py-2 mb-4 w-full"
              />
              <label htmlFor="kategori-stok" className="block text-start">
                Kategori Stok
              </label>
              <input
                id="kategori-stok"
                type="text"
                placeholder="Kategori Stok"
                value={newBarang.kategori_stok}
                onChange={(e) =>
                  setNewBarang({ ...newBarang, kategori_stok: e.target.value })
                }
                className="border border-black px-4 py-2 mb-4 w-full"
              />
              <label htmlFor="kategori-barang" className="block text-start">
                Kategori Barang
              </label>
              <input
                id="kategori-barang"
                type="text"
                placeholder="Kategori Barang"
                value={newBarang.kategori_barang}
                onChange={(e) =>
                  setNewBarang({
                    ...newBarang,
                    kategori_barang: e.target.value,
                  })
                }
                className="border border-black px-4 py-2 mb-4 w-full"
              />
              <label htmlFor="harga" className="block text-start">
                Harga Satuan
              </label>
              <input
                id="harga"
                type="number"
                placeholder="Harga"
                value={newBarang.harga}
                onChange={(e) =>
                  setNewBarang({ ...newBarang, harga: e.target.value })
                }
                className="border border-black px-4 py-2 mb-4 w-full"
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:scale-110"
                onClick={handleAdd}
              >
                Tambah
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded ml-2 transition duration-300 ease-in-out hover:scale-110"
                onClick={() => setShowAddModal(false)}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
      {showErrorAddModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-4 rounded shadow-lg w-2/4 border border-black text-center">
              <h2 className="text-lg mb-4 text-red-600">
                Format Barang yang Anda Tambahkan ini Salah! ❌
              </h2>
              <p className="mb-4 text-red-600">
                Mohon isi Format Tambah Barang dengan Benar 🙏
              </p>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:scale-110"
                onClick={() => setShowErrorAddModal(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
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
      {showEditModal && (
        <div className="mt-8 fixed inset-0  backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-4 rounded shadow-lg w-auto border border-black">
              <h2 className="text-lg mb-4 font-semibold text-center">
                Edit Barang
              </h2>
              <label htmlFor="nama-barang" className="block text-start">
                Nama Barang
              </label>
              <input
                id="nama-barang"
                type="text"
                placeholder="Nama Barang"
                value={editBarang.nama_barang}
                onChange={(e) =>
                  setEditBarang({
                    ...editBarang,
                    nama_barang: e.target.value,
                  })
                }
                className="border border-black px-4 py-2 mb-4 w-full"
              />
              <label htmlFor="stok" className="block text-start">
                Stok
              </label>
              <input
                id="stok"
                type="number"
                placeholder="Stok"
                value={editBarang.stok}
                onChange={(e) =>
                  setEditBarang({ ...editBarang, stok: e.target.value })
                }
                className="border border-black px-4 py-2 mb-4 w-full"
              />
              <label htmlFor="kategori-stok" className="block text-start">
                Kategori Stok
              </label>
              <input
                id="kategori-stok"
                type="text"
                placeholder="Kategori Stok"
                value={editBarang.kategori_stok}
                onChange={(e) =>
                  setEditBarang({
                    ...editBarang,
                    kategori_stok: e.target.value,
                  })
                }
                className="border border-black px-4 py-2 mb-4 w-full"
              />
              <label htmlFor="kategori-barang" className="block text-start">
                Kategori Barang
              </label>
              <input
                id="kategori-barang"
                type="text"
                placeholder="Kategori Barang"
                value={editBarang.kategori_barang}
                onChange={(e) =>
                  setEditBarang({
                    ...editBarang,
                    kategori_barang: e.target.value,
                  })
                }
                className="border border-black px-4 py-2 mb-4 w-full"
              />
              <label htmlFor="harga" className="block text-start">
                Harga Satuan
              </label>
              <input
                id="harga"
                type="number"
                placeholder="Harga"
                value={editBarang.harga}
                onChange={(e) =>
                  setEditBarang({ ...editBarang, harga: e.target.value })
                }
                className="border border-black px-4 py-2 mb-4 w-full"
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:scale-110"
                onClick={() => handleEdit(editBarang.id_barang)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded ml-2 transition duration-300 ease-in-out hover:scale-110"
                onClick={() => setShowEditModal(false)}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-4 rounded shadow-lg w-2/4 border border-black text-center">
              <h2 className="text-lg mb-4">
                Apakah anda yakin ingin menghapus barang ini? 🤔
              </h2>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:scale-110"
                onClick={handleDelete}
              >
                Ya
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded ml-2 transition duration-300 ease-in-out hover:scale-110"
                onClick={() => setShowDeleteModal(false)}
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
