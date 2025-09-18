const express = require('express');
const router = express.Router();
const animaisController = require('../controller/animaisController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/search', authenticateToken, animaisController.buscarAnimaisComFiltros);
router.get('/ong/:ongId', authenticateToken, animaisController.buscarAnimaisPorOng);
router.get('/', authenticateToken, animaisController.listarAnimais);
router.get('/:id', authenticateToken, animaisController.buscarAnimalPorId);
router.post('/', authenticateToken, animaisController.criarAnimal);
router.put('/:id', authenticateToken, animaisController.atualizarAnimal);
router.delete('/:id', authenticateToken, animaisController.deletarAnimal);
module.exports = router;