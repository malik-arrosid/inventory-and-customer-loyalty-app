const pool = require("../../database/db");

const getAllLaporanPenjualan = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM laporan_penjualan");
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Laporan penjualan masih kosong!" });
    }
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getLaporanPenjualanById = async (req, res) => {
  try {
    const id_laporan_penjualan = req.params.id_laporan_penjualan;
    const laporanPenjualan = await pool.query(
      "SELECT * FROM laporan_penjualan WHERE id_laporan_penjualan = $1",
      [id_laporan_penjualan]
    );
    if (laporanPenjualan.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Laporan penjualan tidak ditemukan!" });
    }
    res.status(200).json(laporanPenjualan.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { getAllLaporanPenjualan, getLaporanPenjualanById };
