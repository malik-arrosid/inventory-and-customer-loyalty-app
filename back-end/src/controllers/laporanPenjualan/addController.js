const pool = require("../../database/db");

const addLaporanPenjualan = async (req, res) => {
  try {
    const newLaporanPenjualan = req.body;
    const existingLaporanPenjualan = await pool.query(
      "SELECT * FROM laporan_penjualan WHERE jumlah_penjualan = $1",
      [newLaporanPenjualan.jumlah_penjualan]
    );
    if (existingLaporanPenjualan.rows.length > 0) {
      return res.status(400).json({ error: "Laporan penjualan sudah ada!" });
    }
    const result = await pool.query(
      "INSERT INTO laporan_penjualan (id_laporan_penjualan, waktu, frekuensi_beli, jumlah_penjualan) SELECT COALESCE(MAX(id_laporan_penjualan) + 1, 1), CURRENT_DATE, $1, $2 FROM laporan_penjualan RETURNING *",
      [newLaporanPenjualan.frekuensi_beli, newLaporanPenjualan.jumlah_penjualan]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { addLaporanPenjualan };
