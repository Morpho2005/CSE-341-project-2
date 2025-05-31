const { response } = require('express');
const mongodb = require('../data/database');
const validator = require('../middleware/validator.js')
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['contacts']
    const result = await mongodb.getDatabase().db().collection('contacts').find();
        result.toArray().then((user) => {
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(user)
        });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['contacts']
    
        const userId = new ObjectId(req.params.id)
        const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: userId});
        result.toArray().then((user) => {
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(user[0])
        });
};

const createContact = async (req, res) => {
    //#swagger.tags=['contacts']
    const contact = {
        name: req.body.name,
        number: req.body.number,
    }
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
    if (response != null) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.')
    }
};

const updateContact = async (req, res) => {
    //#swagger.tags=['contacts']
    const contactId = new ObjectId(req.params.id)
    const contact = {
        name: req.body.name,
        number: req.body.number,
    }
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({_id: contactId}, contact);
    if (response.acknowledged != null) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.')
    }
};

const deleteContact = async (req, res) =>{
    //#swagger.tags=['contacts']
    const contactId = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({_id: contactId}, true);
    if (response.deletedCount != null) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the contact.')
    }
}

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
}