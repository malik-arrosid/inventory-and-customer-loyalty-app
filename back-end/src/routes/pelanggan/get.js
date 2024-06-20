const express = require("express");
const router = express.Router();
const getController = require("../../controllers/pelanggan/getController");

router.get("/search", getController.searchPelangganByName);
router.get("/:id_pelanggan", getController.getPelangganById);
router.get("/", getController.getAllPelanggan);

module.exports = router;
