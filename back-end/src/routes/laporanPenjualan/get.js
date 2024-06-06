const express = require("express");
const router = express.Router();
const getController = require("../../controllers/laporanPenjualan/getController");

router.get("/", getController.getAllLaporanPenjualan);
router.get("/:id_laporan_penjualan", getController.getLaporanPenjualanById);

module.exports = router;
