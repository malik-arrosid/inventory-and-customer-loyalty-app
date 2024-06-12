const express = require("express");
const router = express.Router();
const editController = require("../../controllers/inventaris/editController");

router.patch("/:id_barang", editController.editBarang);

module.exports = router;
