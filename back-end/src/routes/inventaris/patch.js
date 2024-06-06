const express = require("express");
const router = express.Router();
const updateController = require("../../controllers/inventaris/updateController");

router.patch("/:id_barang", updateController.updateBarang);

module.exports = router;
