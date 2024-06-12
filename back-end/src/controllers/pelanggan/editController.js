const pool = require("../../database/db");

const editPelanggan = async (req, res) => {
  const id_pelanggan = req.params.id_pelanggan;
  const editPelanggan = req.body;
  const setString = Object.keys(editPelanggan)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");
  const values = Object.values(editPelanggan);
  values.push(id_pelanggan);

  try {
    const editedPelanggan = await pool.query(
      `UPDATE pelanggan SET ${setString} WHERE id_pelanggan = $${values.length} RETURNING *`,
      values
    );
    if (editedPelanggan.rows.length === 0) {
      return res.status(404).json({ message: "Pelanggan tidak ditemukan!" });
    }

    res.status(200).json(editedPelanggan.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { editPelanggan };
