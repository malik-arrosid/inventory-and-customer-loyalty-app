const pool = require("../../database/db");

const updateLaporanPenjualan = async (req, res) => {
  const id_laporan_penjualan = req.params.id_laporan_penjualan;
  const updateLaporanPenjualan = req.body;
  const keys = Object.keys(updateLaporanPenjualan).filter(
    (key) => key !== "waktu"
  );
  const setString = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");
  const values = keys.map((key) => updateLaporanPenjualan[key]);
  values.push(id_laporan_penjualan);

  try {
    const query =
      keys.length > 0
        ? `UPDATE laporan_penjualan SET ${setString} WHERE id_laporan_penjualan = $${values.length} RETURNING *`
        : `SELECT * FROM laporan_penjualan WHERE id_laporan_penjualan = $1`;

    const updatedLaporanPenjualan = await pool.query(query, values);

    if (updatedLaporanPenjualan.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Laporan penjualan tidak ditemukan!" });
    }

    res.status(200).json(updatedLaporanPenjualan.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { updateLaporanPenjualan };
