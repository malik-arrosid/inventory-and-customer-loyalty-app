const express = require("express");
const router = express.Router();
const editController = require("../../controllers/pelanggan/editController");

router.patch("/:id_pelanggan", editController.editPelanggan);

module.exports = router;
