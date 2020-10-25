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

router.get('/carts/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    Carts.findByUserId(user_id)
    .then(carts => {
            return res.status(200).json(carts)
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving cart' })
    })
})

router.post('/carts', (req, res) => {
    const data = req.body;

    Carts.add(data)
    .then(carts => {
        res.status(201).json(carts)
    })
    .catch(() => {
        res.status(500).json({ message: 'Failed to Create cart'})
    })
})

router.put('/carts/:id', (req, res) => {
    const id  = req.params.id;
    const changes = req.body;

    Carts.findById(id)
    .then(carts => {
        if (carts){
            Carts.update(changes, id)
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

router.delete('/carts', (req, res) => {

    Carts.removeAll()
    .then(() => {
        res.status(200).json({ message: 'All carts successfully deleted' })
    })
    .catch(() => {
        res.status(500).json({ message: 'Unable to delete carts' })
    })
})

router.delete('/carts/:id', (req, res) => {
    const id  = req.params.id;

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