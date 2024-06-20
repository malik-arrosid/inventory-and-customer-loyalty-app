import { useState, useEffect } from "react";
import axios from "axios";

export default function PelangganAdmin() {
  const [pelanggans, setPelanggans] = useState([]);
  const [newPelanggan, setNewPelanggan] = useState({
    nama_pelanggan: "",
    frekuensi_beli: "",
    jumlah_pembelian: "",
    poin_loyalitas: "",
  });
  const [editPelanggan, setEditPelanggan] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showErrorAddModal, setShowErrorAddModal] = useState(false);
  const [showErrorFormatSearchModal, setShowErrorFormatSearchModal] =
    useState(false);
  const [errorFormatSearchMessage, setErrorFormatSearchMessage] =
    useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isModalLoyaltyPointsTermsOpen, setIsModalLoyaltyPointsTermsOpen] =
    useState(false);
  const [query, setQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const handleModalOpen = () => {
    setIsModalLoyaltyPointsTermsOpen(true);
  };

  const handleModalClose = () => {
    setIsModalLoyaltyPointsTermsOpen(false);
  };

  useEffect(() => {
    fetchPelanggans();
  }, []);

  const fetchPelanggans = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/pelanggan");
      setPelanggans(response.data);
      setSearchActive(false);
    } catch (error) {
      console.error("There was an error fetching the customers!", error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/pelanggan",
        newPelanggan
      );
      setPelanggans([...pelanggans, response.data]);
      setNewPelanggan({
        nama_pelanggan: "",
        frekuensi_beli: "",
        jumlah_pembelian: "",
        poin_loyalitas: "",
      });
      setShowAddModal(false);
    } catch (error) {
      console.error("There was an error adding the item!", error);
      setShowErrorAddModal(true);
    }
  };

  const handleEdit = async (id_pelanggan) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/pelanggan/${id_pelanggan}`,
        editPelanggan
      );
      setPelanggans(
        pelanggans.map((pelanggan) =>
          pelanggan.id_pelanggan === id_pelanggan ? response.data : pelanggan
        )
      );
      setEditPelanggan(null);
      setShowEditModal(false);
    } catch (error) {
      console.error("There was an error updating the customer!", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/pelanggan/${itemToDelete}`);
      setPelanggans(
        pelanggans.filter(
          (pelanggan) => pelanggan.id_pelanggan !== itemToDelete
        )
      );
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
        "Format Pencarian Pelanggan yang Diinputkan Salah!"
      );
      setShowErrorFormatSearchModal(true);
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/api/pelanggan/search?nama_pelanggan=${query}`
      );
      setPelanggans(response.data);
      setSearchActive(true);
    } catch (error) {
      console.error("There was an error searching for the customer!", error);
    }
  };

  const handleBack = () => {
    setQuery("");
    fetchPelanggans();
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
          placeholder="Cari Pelanggan 🔍"
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
        Tambah Pelanggan
      </button>
      <div className="lg:flex justify-center">
        <table className="max-w-full bg-white mt-4 text-center">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-green-500 border border-black">
                Nama Pelanggan
              </th>
              <th className="py-2 px-4 bg-green-500 border border-black">
                Frekuensi Beli
              </th>
              <th className="py-2 px-4 bg-green-500 border border-black">
                Jumlah Pembelian
              </th>
              <th className="py-2 px-4 bg-green-500 border border-black">
                Poin Loyalitas
              </th>
              <th className="py-2 px-4 bg-green-500 border border-black">
                Tindakan
              </th>
            </tr>
          </thead>
          <tbody className="font-semibold">
            {pelanggans.map((pelanggan) => (
              <tr key={pelanggan.id_pelanggan}>
                <td className="border border-black px-4 py-2">
                  {pelanggan.nama_pelanggan}
                </td>
                <td className="border border-black px-4 py-2">
                  {pelanggan.frekuensi_beli}
                </td>
                <td className="border border-black px-4 py-2">
                  {pelanggan.jumlah_pembelian}
                </td>
                <td className="border border-black px-4 py-2">
                  {pelanggan.poin_loyalitas}
                </td>
                <td className="border border-black px-4 py-2 text-center">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded transition duration-300 ease-in-out hover:scale-110"
                    onClick={() => {
                      setEditPelanggan(pelanggan);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <span className="mx-2 text-white">space</span>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded transition duration-300 ease-in-out hover:scale-110"
                    onClick={() => {
                      setItemToDelete(pelanggan.id_pelanggan);
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
        <button
          className="mt-6 ml-3 p-3 bg-black text-amber-500 border-2 border-amber-500 rounded-full h-6 w-6 flex items-center justify-center transition duration-500 ease-in-out hover:scale-110"
          onClick={handleModalOpen}
        >
          ?
        </button>
      </div>

      {isModalLoyaltyPointsTermsOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur">
          <div className="bg-white p-4 rounded shadow-lg max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4 relative flex items-center justify-between">
              Bonus Pembelian Berdasarkan Poin Loyalitas
              <span className="text-sm text-gray-600 ml-4">
                NB: Diberikan saat <br /> Hari Raya Idul Fitri dan <br />
                Tahun Baru
              </span>
            </h2>
            <ul className="list-disc list-inside text-left">
              <li>10 Poin: Uang = 50.000</li>
              <li>20 Poin: Uang = 100.000 + 2 Detergen Bubuk Ukuran 215g</li>
              <li>30 Poin: Uang = 150.000 + 3 Detergen Bubuk Ukuran 215g</li>
              <li>40 Poin: Uang = 200.000 + 4 Detergen Bubuk Ukuran 215g</li>
              <li>50 Poin: Uang = 250.000 + 4 Detergen Bubuk Ukuran 215g</li>
            </ul>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:scale-110 hover:bg-red-600 hover:text-black"
              onClick={handleModalClose}
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="mt-8 fixed inset-0 overflow-y-auto backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-4 rounded shadow-lg w-auto border border-black">
              <h2 className="text-lg mb-4 font-semibold text-center">
                Tambah Pelanggan
              </h2>
              <label htmlFor="nama-pelanggan" className="block text-start">
                Nama Pelanggan
              </label>
              <input
                id="nama-pelanggan"
                type="text"
                placeholder="Nama Pelanggan"
                value={newPelanggan.nama_pelanggan}
                onChange={(e) =>
                  setNewPelanggan({
                    ...newPelanggan,
                    nama_pelanggan: e.target.value,
                  })
                }
                className="border border-black px-4 py-2 mb-4 w-full"
              />
              <label htmlFor="frekuensi-beli" className="block text-start">
                Frekuensi Beli
              </label>
              <input
                id="frekuensi-beli"
                type="number"
                placeholder="Frekuensi Beli"
                value={newPelanggan.frekuensi_beli}
                onChange={(e) =>
                  setNewPelanggan({
                    ...newPelanggan,
                    frekuensi_beli: e.target.value,
                  })
                }
                className="border border-black px-4 py-2 mb-4 w-full"
              />
              <label htmlFor="jumlah-pembelian" className="block text-start">
                Jumlah Pembelian
              </label>
              <input
                id="jumlah-pembelian"
                type="number"
                placeholder="Jumlah Pembelian"
                value={newPelanggan.jumlah_pembelian}
                onChange={(e) =>
                  setNewPelanggan({
                    ...newPelanggan,
                    jumlah_pembelian: e.target.value,
                  })
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
                Format Pelanggan yang Anda Tambahkan Salah! ❌
              </h2>
              <p className="mb-4 text-red-600">
                Mohon isi Format Tambah Pelanggan dengan Benar 🙏
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
                Edit Pelanggan
              </h2>
              <label htmlFor="nama-pelanggan" className="block text-start">
                Nama Pelanggan
              </label>
              <input
                id="nama-pelanggan"
                type="text"
                placeholder="Nama Pelanggan"
                value={editPelanggan.nama_pelanggan}
                onChange={(e) =>
                  setEditPelanggan({
                    ...editPelanggan,
                    nama_pelanggan: e.target.value,
                  })
                }
                className="border border-black px-4 py-2 mb-4 w-full"
              />
              <label htmlFor="frekuensi-beli" className="block text-start">
                Frekuensi Beli
              </label>
              <input
                id="frekuensi-beli"
                type="number"
                placeholder="Frekuensi Beli"
                value={editPelanggan.frekuensi_beli}
                onChange={(e) =>
                  setEditPelanggan({
                    ...editPelanggan,
                    frekuensi_beli: e.target.value,
                  })
                }
                className="border border-black px-4 py-2 mb-4 w-full"
              />
              <label htmlFor="jumlah-pembelian" className="block text-start">
                Jumlah Pembelian
              </label>
              <input
                id="jumlah-pembelian"
                type="number"
                placeholder="Jumlah Pembelian"
                value={editPelanggan.jumlah_pembelian}
                onChange={(e) =>
                  setEditPelanggan({
                    ...editPelanggan,
                    jumlah_pembelian: e.target.value,
                  })
                }
                className="border border-black px-4 py-2 mb-4 w-full"
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:scale-110"
                onClick={() => handleEdit(editPelanggan.id_pelanggan)}
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
                Apakah anda yakin ingin menghapus pelanggan ini? 🤔
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
