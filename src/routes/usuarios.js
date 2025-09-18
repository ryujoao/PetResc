const express = require('express');
const router = express.Router();
const userController = require('../controller/usuariosController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, userController.listarUsuarios);
router.post('/', authenticateToken, userController.criarUsuario);
router.delete('/:id', authenticateToken, userController.deletarUsuario);

module.exports = router;