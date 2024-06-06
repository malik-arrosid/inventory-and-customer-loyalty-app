const express = require("express");
const router = express.Router();
const deleteController = require("../../controllers/pelanggan/deleteController");

router.delete("/:id_pelanggan", deleteController.deletePelangganById);

module.exports = router;
