const express = require('express');
const router = express.Router();
const relatorioController = require('../controller/relatoriosController');
const { authenticateToken } = require('../middlewares/authMiddleware');


router.get('/animais',authenticateToken,  relatorioController.relatorioAnimais);
router.get('/doacoes', authenticateToken, relatorioController.relatorioDoacoes);
router.get('/usuarios', authenticateToken, relatorioController.relatorioUsuarios);

module.exports = router;
