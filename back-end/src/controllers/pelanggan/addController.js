const pool = require("../../database/db");

const addPelanggan = async (req, res) => {
  try {
    const newPelanggan = req.body;
    const existingPelanggan = await pool.query(
      "SELECT * FROM pelanggan WHERE nama_pelanggan = $1",
      [newPelanggan.nama_pelanggan]
    );
    if (existingPelanggan.rows.length > 0) {
      return res.status(400).json({ error: "Pelanggan sudah ada!" });
    }
    const result = await pool.query(
      "INSERT INTO pelanggan (id_pelanggan, nama_pelanggan, frekuensi_beli, poin_loyalitas) SELECT COALESCE(MAX(id_pelanggan) + 1, 1), $1, $2, $3 FROM pelanggan RETURNING *",
      [
        newPelanggan.nama_pelanggan,
        newPelanggan.frekuensi_beli,
        newPelanggan.poin_loyalitas,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { addPelanggan };
