import { useState, useEffect } from "react";
import axios from "axios";

export default function InventarisOwner() {
  const [barangs, setBarangs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/inventaris")
      .then((response) => {
        setBarangs(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the inventory!", error);
      });
  }, []);

  return (
    <div className="container mx-auto mt-24 text-center">
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
          <tbody>
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
    </div>
  );
}
