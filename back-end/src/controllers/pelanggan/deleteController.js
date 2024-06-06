const pool = require("../../database/db");

const deletePelangganById = async (req, res) => {
  try {
    const id_pelanggan = req.params.id_pelanggan;
    const result = await pool.query(
      "DELETE FROM pelanggan WHERE id_pelanggan = $1",
      [id_pelanggan]
    );
    if (result.rowCount === 0) {
      return res.status(404).send("Pelanggan tidak ditemukan!");
    }
    res.status(200).send(`Pelanggan berhasil dihapus!`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { deletePelangganById };
