const pool = require("../../database/db");

const editBarang = async (req, res) => {
  const id_barang = req.params.id_barang;
  const editBarang = req.body;
  const setString = Object.keys(editBarang)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");
  const values = Object.values(editBarang);
  values.push(id_barang);

  try {
    const editedBarang = await pool.query(
      `UPDATE inventaris SET ${setString} WHERE id_barang = $${values.length} RETURNING *`,
      values
    );
    if (editedBarang.rows.length === 0) {
      return res.status(404).json({ message: "Barang tidak ditemukan!" });
    }

    res.status(200).json(editedBarang.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { editBarang };
