const pool = require("../../database/db");

const deleteLaporanPenjualanById = async (req, res) => {
  try {
    const id_laporan_penjualan = req.params.id_laporan_penjualan;
    const result = await pool.query(
      "DELETE FROM laporan_penjualan WHERE id_laporan_penjualan = $1",
      [id_laporan_penjualan]
    );
    if (result.rowCount === 0) {
      // Check if no rows were affected
      return res.status(404).send("Laporan penjualan tidak ditemukan!");
    }
    res.status(200).send("Laporan penjualan berhasil dihapus!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { deleteLaporanPenjualanById };
