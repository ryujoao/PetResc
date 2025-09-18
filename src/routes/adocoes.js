const express = require('express');
const router = express.Router();
const adocoesController = require('../controller/adocoesController');
const { authenticateToken } = require('../middlewares/authMiddleware');



router.get('/', authenticateToken, adocoesController.listarTodos);
router.get('/:id',authenticateToken,  adocoesController.listarPorId);
router.post('/', authenticateToken, adocoesController.criar);
router.put('/:id', authenticateToken, adocoesController.atualizar);
router.delete('/:id',authenticateToken, adocoesController.deletar);

module.exports = router;
