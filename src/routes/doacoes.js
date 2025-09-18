const express = require('express');
const router = express.Router();
const doacoesController = require('../controller/doacaoController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, doacoesController.getAll);
router.get('/:id',authenticateToken, doacoesController.getById);
router.post('/', authenticateToken, doacoesController.create);
router.get('/ong/:id', authenticateToken, doacoesController.getByOng);

module.exports = router;
