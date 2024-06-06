const express = require("express");
const router = express.Router();
const deleteController = require("../../controllers/laporanPenjualan/deleteController");

router.delete("/:id_laporan_penjualan", deleteController.deleteLaporanPenjualanById);

module.exports = router;
