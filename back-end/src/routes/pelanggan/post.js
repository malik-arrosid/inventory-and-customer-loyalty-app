const express = require("express");
const router = express.Router();
const addController = require("../../controllers/pelanggan/addController");

router.post("/", addController.addPelanggan);

module.exports = router;
