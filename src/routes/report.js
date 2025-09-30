

const express = require("express");
const router = express.Router();
const reportController = require("../controller/reportController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/roleMiddleware"); 


router.post("/", authenticateToken, reportController.criarReport);

router.get("/", authenticateToken, authorizeRole("ADMIN"), reportController.listarReports);

router.put("/:id", authenticateToken, reportController.atualizarReport);

router.delete("/:id", authenticateToken, reportController.apagarReport);

module.exports = router;