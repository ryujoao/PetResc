const express = require('express');
const router = express.Router();
const relatorioController = require('../controller/relatoriosController');

router.get('/animais', relatorioController.relatorioAnimais);
router.get('/doacoes', relatorioController.relatorioDoacoes);
router.get('/usuarios', relatorioController.relatorioUsuarios);

module.exports = router;
