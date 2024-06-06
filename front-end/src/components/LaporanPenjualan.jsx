import { useState, useEffect } from "react";
import axios from "axios";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export default function LaporanPenjualan() {
  const [laporanPenjualans, setLaporanPenjualans] = useState([]);
  const [newLaporanPenjualan, setNewLaporanPenjualan] = useState({
    waktu: "",
    frekuensi_beli: "",
    jumlah_penjualan: "",
  });
  const [updateLaporanPenjualan, setUpdateLaporanPenjualan] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/laporanPenjualan")
      .then((response) => {
        setLaporanPenjualans(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the customer!", error);
      });
  }, []);

  const handleAdd = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/laporanPenjualan",
        newLaporanPenjualan
      );
      setLaporanPenjualans([...laporanPenjualans, response.data]);
      setNewLaporanPenjualan({
        waktu: "",
        frekuensi_beli: "",
        jumlah_penjualan: "",
      });
      setShowAddModal(false);
    } catch (error) {
      console.error("There was an error adding the item!", error);
    }
  };

  const handleEdit = async (id_laporan_penjualan) => {
    try {
      const updatePayload = { ...updateLaporanPenjualan };

      // Remove 'waktu' from the payload if it should not be updated
      if (!updatePayload.waktu) {
        delete updatePayload.waktu;
      }

      const response = await axios.patch(
        `http://localhost:5000/api/laporanPenjualan/${id_laporan_penjualan}`,
        updatePayload
      );
      setLaporanPenjualans(
        laporanPenjualans.map((laporanPenjualan) =>
          laporanPenjualan.id_laporan_penjualan === id_laporan_penjualan
            ? response.data
            : laporanPenjualan
        )
      );
      setUpdateLaporanPenjualan(null);
      setShowUpdateModal(false);
    } catch (error) {
      console.error("There was an error updating the customer!", error);
    }
  };

  const handleDelete = async (id_laporan_penjualan) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/laporanPenjualan/${id_laporan_penjualan}`
      );
      setLaporanPenjualans(
        laporanPenjualans.filter(
          (laporanPenjualan) =>
            laporanPenjualan.id_laporan_penjualan !== id_laporan_penjualan
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
        Tambah Laporan Penjualan
      </button>
      <div className="flex justify-center">
        <table className="max-w-full bg-white mt-4 text-center">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-green-500 border border-black">
                Waktu
              </th>
              <th className="py-2 px-4 bg-green-500 border border-black">
                Frekuensi Beli
              </th>
              <th className="py-2 px-4 bg-green-500 border border-black">
                Jumlah Penjualan
              </th>
              <th className="py-2 px-4 bg-green-500 border border-black">
                Tindakan
              </th>
            </tr>
          </thead>
          <tbody>
            {laporanPenjualans.map((laporanPenjualan) => (
              <tr key={laporanPenjualan.id_laporan_penjualan}>
                <td className="border border-black px-4 py-2">
                  {formatDate(laporanPenjualan.waktu)}
                </td>
                <td className="border border-black px-4 py-2">
                  {laporanPenjualan.frekuensi_beli}
                </td>
                <td className="border border-black px-4 py-2">
                  {laporanPenjualan.jumlah_penjualan}
                </td>
                <td className="border border-black px-4 py-2 text-center">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded transition duration-300 ease-in-out hover:scale-110"
                    onClick={() => {
                      setUpdateLaporanPenjualan(laporanPenjualan);
                      setShowUpdateModal(true);
                    }}
                  >
                    Update
                  </button>
                  <span className="mx-2 text-white">space</span>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded transition duration-300 ease-in-out hover:scale-110"
                    onClick={() =>
                      handleDelete(laporanPenjualan.id_laporan_penjualan)
                    }
                  >
                    Delete
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
              <h2 className="text-lg mb-4 text-center">
                Tambah Laporan Penjualan
              </h2>
              <input
                type="number"
                placeholder="Frekuensi Beli"
                value={newLaporanPenjualan.frekuensi_beli}
                onChange={(e) =>
                  setNewLaporanPenjualan({
                    ...newLaporanPenjualan,
                    frekuensi_beli: e.target.value,
                  })
                }
                className="border border-black px-4 py-2 mb-4 w-full"
              />
              <input
                type="number"
                placeholder="Jumlah Penjualan"
                value={newLaporanPenjualan.jumlah_penjualan}
                onChange={(e) =>
                  setNewLaporanPenjualan({
                    ...newLaporanPenjualan,
                    jumlah_penjualan: e.target.value,
                  })
                }
                className="border border-black px-4 py-2 mb-4 w-full"
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:scale-110"
                onClick={handleAdd}
              >
                Add
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded ml-2 transition duration-300 ease-in-out hover:scale-110"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="fixed z-10 inset-0  backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-4 rounded shadow-lg w-2/4 border border-black">
              <h2 className="text-lg mb-4 text-center">
                Update Laporan Penjualan
              </h2>
              <input
                type="number"
                placeholder="Frekuensi Beli"
                value={updateLaporanPenjualan.frekuensi_beli}
                onChange={(e) =>
                  setUpdateLaporanPenjualan({
                    ...updateLaporanPenjualan,
                    frekuensi_beli: e.target.value,
                  })
                }
                className="border border-black px-4 py-2 mb-4 w-full"
              />
              <input
                type="number"
                placeholder="Jumlah Penjualan"
                value={updateLaporanPenjualan.jumlah_penjualan}
                onChange={(e) =>
                  setUpdateLaporanPenjualan({
                    ...updateLaporanPenjualan,
                    jumlah_penjualan: e.target.value,
                  })
                }
                className="border border-black px-4 py-2 mb-4 w-full"
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:scale-110"
                onClick={() =>
                  handleEdit(updateLaporanPenjualan.id_laporan_penjualan)
                }
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded ml-2 transition duration-300 ease-in-out hover:scale-110"
                onClick={() => setShowUpdateModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
