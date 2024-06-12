import { useState, useEffect } from "react";
import axios from "axios";

export default function PelangganOwner() {
  const [pelanggans, setPelanggans] = useState([]);

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

  return (
    <div className="container mx-auto mt-24 text-center">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
