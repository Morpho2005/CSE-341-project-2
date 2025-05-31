const express = require('express');
const { contactValidationRules} = require('../middleware/validator.js')
const router = express.Router();

const contactsController = require('../controllers/contact.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', isAuthenticated, contactValidationRules, contactsController.createContact);

router.put('/:id', isAuthenticated, contactValidationRules, contactsController.updateContact);

router.delete('/:id', isAuthenticated, contactsController.deleteContact)

module.exports = router;