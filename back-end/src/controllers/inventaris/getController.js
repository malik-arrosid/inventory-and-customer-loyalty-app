const pool = require("../../database/db");

const getAllBarang = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM inventaris");
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Barang masih kosong!" });
    }
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getBarangById = async (req, res) => {
  try {
    const id_barang = req.params.id_barang;
    const barang = await pool.query(
      "SELECT * FROM inventaris WHERE id_barang = $1",
      [id_barang]
    );
    if (barang.rows.length === 0) {
      return res.status(404).json({ message: "Barang tidak ditemukan!" });
    }
    res.status(200).json(barang.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { getAllBarang, getBarangById };
