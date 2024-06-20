const express = require("express");
const router = express.Router();
const getController = require("../../controllers/inventaris/getController");

router.get("/search", getController.searchBarangByName);
router.get("/:id_barang", getController.getBarangById);
router.get("/", getController.getAllBarang);

module.exports = router;
