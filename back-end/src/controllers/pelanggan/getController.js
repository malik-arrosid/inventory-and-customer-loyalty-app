const pool = require("../../database/db");

const getAllPelanggan = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pelanggan");
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Pelanggan masih kosong!" });
    }
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getPelangganById = async (req, res) => {
  try {
    const id_pelanggan = req.params.id_pelanggan;
    const pelanggan = await pool.query(
      "SELECT * FROM pelanggan WHERE id_pelanggan = $1",
      [id_pelanggan]
    );
    if (pelanggan.rows.length === 0) {
      return res.status(404).json({ message: "Pelanggan tidak ditemukan!" });
    }
    res.status(200).json(pelanggan.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { getAllPelanggan, getPelangganById };
