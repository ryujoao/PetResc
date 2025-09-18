const express = require('express');
const router = express.Router();
const larTemporarioController = require('../controller/larTemporarioController');


router.get('/', larTemporarioController.getAll);
router.get('/:id', larTemporarioController.getById);
router.post('/', larTemporarioController.create);
router.put('/:id', larTemporarioController.updateStatus);
router.delete('/:id', larTemporarioController.remove);

module.exports = router;
