const express = require('express');
const { userValidationRules} = require('../middleware/validator.js')
const router = express.Router();

const usersController = require('../controllers/users.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', isAuthenticated, userValidationRules, usersController.createUser);

router.put('/:id', isAuthenticated, userValidationRules, usersController.updateUser);

router.delete('/:id', isAuthenticated, usersController.deleteUser)

module.exports = router;