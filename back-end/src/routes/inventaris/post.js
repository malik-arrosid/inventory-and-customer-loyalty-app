const express = require("express");
const router = express.Router();
const addController = require("../../controllers/inventaris/addController");

router.post("/", addController.addBarang);

module.exports = router;
