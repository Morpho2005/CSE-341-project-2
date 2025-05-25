const { response } = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Produce']
    const result = await mongodb.getDatabase().db().collection('produce').find();
    result.toArray().then((produce) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(produce)
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Produce']
    const produceId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('produce').find({ _id: produceId});
    result.toArray().then((produce) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(produce[0])
    });
};

const createproduce = async (req, res) => {
    //#swagger.tags=['Produce']
    const produce = {
        email: req.body.email,
        producename: req.body.producename,
        name: req.body.name,
        ipaddress: req.body.ipaddress
    }
    const response = await mongodb.getDatabase().db().collection('produce').insertOne(produce);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the produce.')
    }
};

const updateproduce = async (req, res) => {
    //#swagger.tags=['Produce']
    const produceId = new ObjectId(req.params.id)
    const produce = {
        email: req.body.email,
        producename: req.body.producename,
        name: req.body.name,
        ipaddress: req.body.ipaddress
    }
    const response = await mongodb.getDatabase().db().collection('produce').replaceOne({_id: produceId}, produce);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the produce.')
    }
};

const deleteproduce = async (req, res) =>{
    //#swagger.tags=['Produce']
    const produceId = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db().collection('produce').deleteOne({_id: produceId}, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the produce.')
    }
}

module.exports = {
    getAll,
    getSingle,
    createproduce,
    updateproduce,
    deleteproduce
}