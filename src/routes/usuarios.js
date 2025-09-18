const express = require('express');
const router = express.Router();
const userController = require('../controller/usuariosController');
const { authenticateToken } = require('../middleware/authMiddleware');


router.get('/listar', authenticateToken, userController.listarUsuarios);
router.post('/criar', authenticateToken, userController.criarUsuario);
router.delete('/:id', authenticateToken, userController.deletarUsuario);

module.exports = router;
