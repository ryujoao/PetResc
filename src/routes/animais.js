const express = require('express');
const router = express.Router();
const animaisController = require('../controller/animaisController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');

router.get('/', animaisController.listarAnimais);

router.get('/:id', animaisController.buscarAnimalPorId);


router.use(authenticateToken);

router.post('/', authorizeRole('ONG'), animaisController.criarAnimal);

router.put('/:id', animaisController.atualizarAnimal);
 
router.delete('/:id', animaisController.deletarAnimal);

module.exports = router;