const express = require("express");
const router = express.Router();
const getController = require("../../controllers/inventaris/getController");

router.get("/", getController.getAllBarang);
router.get("/:id_barang", getController.getBarangById);

module.exports = router;
