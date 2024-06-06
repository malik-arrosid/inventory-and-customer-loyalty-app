const express = require("express");
const router = express.Router();
const deleteController = require("../../controllers/inventaris/deleteController");

router.delete("/:id_barang", deleteController.deleteBarangById);

module.exports = router;
