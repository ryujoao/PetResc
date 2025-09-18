const express = require('express');
const router = express.Router();
const doacoesController = require('../controller/doacaoController');


router.get('/', doacoesController.getAll);
router.get('/:id', doacoesController.getById);
router.post('/', doacoesController.create);
router.get('/ong/:id', doacoesController.getByOng);

module.exports = router;
