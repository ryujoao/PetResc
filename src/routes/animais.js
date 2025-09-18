const express = require('express');
const router = express.Router();
const animaisController = require('../controller/animaisController');
const { authenticateToken } = require('../middleware/authMiddleware');

// GET - Buscar animais com filtros
router.get('/search', authenticateToken, animaisController.buscarAnimaisComFiltros);

// GET - Buscar animais por ONG
router.get('/ong/:ongId', authenticateToken, animaisController.buscarAnimaisPorOng);

// GET - Listar todos os animais
router.get('/', authenticateToken, animaisController.listarAnimais);

// GET - Buscar um animal específico por ID
router.get('/:id', authenticateToken, animaisController.buscarAnimalPorId);

// POST - Criar um animal
router.post('/', authenticateToken, animaisController.criarAnimal);

// PUT - Atualizar um animal
router.put('/:id', authenticateToken, animaisController.atualizarAnimal);

// DELETE - Deletar um animal
router.delete('/:id', authenticateToken, animaisController.deletarAnimal);

module.exports = router;