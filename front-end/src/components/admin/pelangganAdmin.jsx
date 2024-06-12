import { useState, useEffect } from "react";
import axios from "axios";

export default function PelangganAdmin() {
  const [pelanggans, setPelanggans] = useState([]);
  const [newPelanggan, setNewPelanggan] = useState({
    nama_pelanggan: "",
    frekuensi_beli: "",
    poin_loyalitas: "",
  });
  const [editPelanggan, setEditPelanggan] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/pelanggan")
      .then((response) => {
        setPelanggans(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the customer!", error);
      });
  }, []);

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
        poin_loyalitas: "",
      });
      setShowAddModal(false);
    } catch (error) {
      console.error("There was an error adding the item!", error);
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

  const handleDelete = async (id_pelanggan) => {
    try {
      await axios.delete(`http://localhost:5000/api/pelanggan/${id_pelanggan}`);
      setPelanggans(
        pelanggans.filter(
          (pelanggan) => pelanggan.id_pelanggan !== id_pelanggan
        )
      );
    } catch (error) {
      console.error("There was an error deleting the item!", error);
    }
  };

  return (
    <div className="container mx-auto mt-24 text-center">
      <button
        className="bg-green-500 text-black px-4 py-2 rounded transition duration-300 ease-in-out hover:scale-110"
        onClick={() => setShowAddModal(true)}
      >
        Tambah Pelanggan
      </button>
      <div className="flex justify-center">
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
                Poin Loyalitas
              </th>
              <th className="py-2 px-4 bg-green-500 border border-black">
                Tindakan
              </th>
            </tr>
          </thead>
          <tbody>
            {pelanggans.map((pelanggan) => (
              <tr key={pelanggan.id_pelanggan}>
                <td className="border border-black px-4 py-2">
                  {pelanggan.nama_pelanggan}
                </td>
                <td className="border border-black px-4 py-2">
                  {pelanggan.frekuensi_beli}
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
                    onClick={() => handleDelete(pelanggan.id_pelanggan)}
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
        <div className="fixed z-10 inset-0 overflow-y-auto backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-4 rounded shadow-lg w-2/4 border border-black">
              <h2 className="text-lg mb-4 text-center">Tambah Pelanggan</h2>
              <input
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
              <input
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
              <input
                type="number"
                placeholder="Poin Loyalitas"
                value={newPelanggan.poin_loyalitas}
                onChange={(e) =>
                  setNewPelanggan({
                    ...newPelanggan,
                    poin_loyalitas: e.target.value,
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

      {showEditModal && (
        <div className="fixed z-10 inset-0  backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-4 rounded shadow-lg w-2/4 border border-black">
              <h2 className="text-lg mb-4 text-center">Edit Pelanggan</h2>
              <input
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
              <input
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
              <input
                type="number"
                placeholder="Poin Loyalitas"
                value={editPelanggan.poin_loyalitas}
                onChange={(e) =>
                  setEditPelanggan({
                    ...editPelanggan,
                    poin_loyalitas: e.target.value,
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
    </div>
  );
}
