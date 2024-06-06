const pool = require("../../database/db");

const updatePelanggan = async (req, res) => {
  const id_pelanggan = req.params.id_pelanggan;
  const updatePelanggan = req.body;
  const setString = Object.keys(updatePelanggan)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");
  const values = Object.values(updatePelanggan);
  values.push(id_pelanggan);

  try {
    const updatedPelanggan = await pool.query(
      `UPDATE pelanggan SET ${setString} WHERE id_pelanggan = $${values.length} RETURNING *`,
      values
    );
    if (updatedPelanggan.rows.length === 0) {
      return res.status(404).json({ message: "Pelanggan tidak ditemukan!" });
    }

    res.status(200).json(updatedPelanggan.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { updatePelanggan };
