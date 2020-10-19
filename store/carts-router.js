const express = require('express');
const restricted = require('../admins/restricted-middleware')
const Carts = require('./carts-model')

const router = express.Router()

router.get('/carts', (req, res) => {
    
    Carts.findAll()
    .then(carts => {
        res.status(200).json(carts)
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving carts' })
    })
})

router.get('/carts/:id', (req, res) => {
    const { id } = req.params;

    Carts.findById(id)
    .then(carts => {
        if(carts.id >= 0){
            return res.status(200).json(carts)
        } else {
            return res.status(404).json({ message: 'Error id invalid' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving cart' })
    })
})

router.post('/carts', restricted, (req, res) => {
    const data = req.body;

    Carts.add(data)
    .then(carts => {
        res.status(201).json(carts)
    })
    .catch(() => {
        res.status(500).json({ message: 'Failed to Create cart'})
    })
})

router.put('/carts/:id', restricted, (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Carts.findById(id)
    .then(carts => {
        if (carts){
            carts.update(changes, id)
            .then(updatedCarts => {
                res.status(200).json(updatedCarts)
            });
        } else {
            res.status(404).json({ message: 'Could not find specified cart'})
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error updating cart' })
    })
})

router.delete('/carts', restricted, (req, res) => {

    Carts.removeAll()
    .then(() => {
        res.status(200).json({ message: 'All carts successfully deleted' })
    })
    .catch(() => {
        res.status(500).json({ message: 'Unable to delete carts' })
    })
})

router.delete('/carts/:id', restricted, (req, res) => {
    const { id } = req.params;

    Carts.removeById(id)
    .then(deleted => {
        if(deleted) {
            res.status(200).json({ message: 'cart removed' })
        } else {
            res.status(404).json({ message: 'Could not find specified cart' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error deleting cart' })
    })
})

module.exports = router