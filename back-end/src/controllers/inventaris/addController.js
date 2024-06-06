const pool = require("../../database/db");

const addBarang = async (req, res) => {
  try {
    const newBarang = req.body;
    const existingBarang = await pool.query(
      "SELECT * FROM inventaris WHERE nama_barang = $1",
      [newBarang.nama_barang]
    );
    if (existingBarang.rows.length > 0) {
      return res.status(400).json({ error: "Barang sudah ada!" });
    }
    const result = await pool.query(
      "INSERT INTO inventaris (id_barang, nama_barang, stok, kategori_stok, kategori_barang, harga) SELECT COALESCE(MAX(id_barang) + 1, 1), $1, $2, $3, $4, $5 FROM inventaris RETURNING *",
      [
        newBarang.nama_barang,
        newBarang.stok,
        newBarang.kategori_stok,
        newBarang.kategori_barang,
        newBarang.harga,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { addBarang };
