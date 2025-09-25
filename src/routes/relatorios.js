const express = require('express');
const router = express.Router();
const relatorioController = require('../controller/relatoriosController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware'); 



router.get('/animais',authenticateToken, authorizeRole("ADMIN"), relatorioController.relatorioAnimais);
router.get('/doacoes', authenticateToken,authorizeRole("ADMIN"), relatorioController.relatorioDoacoes);
router.get('/usuarios', authenticateToken,authorizeRole("ADMIN"), relatorioController.relatorioUsuarios);

module.exports = router;
