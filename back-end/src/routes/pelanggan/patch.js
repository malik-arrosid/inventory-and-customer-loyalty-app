const express = require("express");
const router = express.Router();
const updateController = require("../../controllers/pelanggan/updateController");

router.patch("/:id_pelanggan", updateController.updatePelanggan);

module.exports = router;
