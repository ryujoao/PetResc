const express = require('express');
const router = express.Router();
const adocoesController = require('../controller/adocoesController');


router.get('/', adocoesController.listarTodos);
router.get('/:id', adocoesController.listarPorId);
router.post('/', adocoesController.criar);
router.put('/:id', adocoesController.atualizar);
router.delete('/:id', adocoesController.deletar);

module.exports = router;
