const express = require("express");
const router = express.Router();
const feedController = require("../controller/feedController");

router.get("/", feedController.getFeed);
router.get("/filtro", feedController.getFeedComFiltro);

module.exports = router;
