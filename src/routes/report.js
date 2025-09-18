const express = require("express");
const router = express.Router();
const reportController = require("../controller/reportController");

router.post("/", reportController.criarReport);       
router.get("/", reportController.listarReports);        
router.put("/:id", reportController.atualizarReport);  
router.delete("/:id", reportController.apagarReport);   

module.exports = router;
