const express = require("express");
const router = express.Router();
const addController = require("../../controllers/laporanPenjualan/addController");

router.post("/", addController.addLaporanPenjualan);

module.exports = router;
