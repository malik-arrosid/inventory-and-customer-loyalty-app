const pool = require("../../database/db");

const deleteBarangById = async (req, res) => {
  try {
    const id_barang = req.params.id_barang;
    const result = await pool.query(
      "DELETE FROM inventaris WHERE id_barang = $1",
      [id_barang]
    );
    if (result.rowCount === 0) {
      return res.status(404).send("Barang tidak ditemukan!");
    }
    res.status(200).send("Barang berhasil dihapus!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { deleteBarangById };
