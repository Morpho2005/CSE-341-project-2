const express = require('express');
const router = express.Router();

const produceController = require('../controllers/produce');

router.get('/', produceController.getAll);

router.get('/:id', produceController.getSingle);

router.post('/', produceController.createUser);

router.put('/:id', produceController.updateUser);

router.delete('/:id', produceController.deleteUser)

module.exports = router;