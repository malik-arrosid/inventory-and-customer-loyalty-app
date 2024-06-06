const express = require("express");
const router = express.Router();
const getController = require("../../controllers/pelanggan/getController");

router.get("/", getController.getAllPelanggan);
router.get("/:id_pelanggan", getController.getPelangganById);

module.exports = router;
