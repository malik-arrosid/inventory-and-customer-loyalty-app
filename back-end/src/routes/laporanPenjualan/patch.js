const express = require("express");
const router = express.Router();
const updateController = require("../../controllers/laporanPenjualan/updateController");

router.patch("/:id_laporan_penjualan", updateController.updateLaporanPenjualan);

module.exports = router;
