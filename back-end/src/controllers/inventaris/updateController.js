const pool = require("../../database/db");

const updateBarang = async (req, res) => {
  const id_barang = req.params.id_barang;
  const updateBarang = req.body;
  const setString = Object.keys(updateBarang)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");
  const values = Object.values(updateBarang);
  values.push(id_barang);

  try {
    const updatedBarang = await pool.query(
      `UPDATE inventaris SET ${setString} WHERE id_barang = $${values.length} RETURNING *`,
      values
    );
    if (updatedBarang.rows.length === 0) {
      return res.status(404).json({ message: "Barang tidak ditemukan!" });
    }

    res.status(200).json(updatedBarang.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { updateBarang };
