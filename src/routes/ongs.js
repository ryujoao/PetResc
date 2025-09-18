const express = require('express');
const router = express.Router();
const ongController = require('../controller/ongsController');
const { authenticateToken } = require('../middlewares/authMiddleware');


router.post('/register',authenticateToken,  ongController.registerOng);
router.post('/login',authenticateToken,  ongController.loginOng);
router.get('/', authenticateToken, ongController.getAllOngs);
router.get('/:id', authenticateToken, ongController.getOngById);
router.get('/:id/animais',authenticateToken, ongController.getAnimaisByOng);

module.exports = router;
