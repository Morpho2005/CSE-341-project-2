const { response } = require('express');
const mongodb = require('../data/database');
const validator = require('../middleware/validator.js')
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['users']
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((user) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(user)
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['users']
    const userId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId});
    result.toArray().then((user) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(user[0])
    });
};

const createUser = async (req, res) => {
    //#swagger.tags=['users']
    const user = {
        username: req.body.username,
        password: req.body.password,
    }
    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response != null) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the user.')
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['users']
    const userId = new ObjectId(req.params.id)
    const user = {
        username: req.body.username,
        password: req.body.password,
    }
    const response = await mongodb.getDatabase().db().collection('users').replaceOne({_id: userId}, user);
    if (response.acknowledged != null) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.')
    }
};

const deleteUser = async (req, res) =>{
    //#swagger.tags=['users']
    const userId = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({_id: userId}, true);
    if (response.deletedCount != null) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user.')
    }
}

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
}