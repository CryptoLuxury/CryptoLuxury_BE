const express = require('express');
const restricted = require('../admins/restricted-middleware')
const CardOrders = require('./cardOrders-model')

const router = express.Router()

router.get('/cardOrders', (req, res) => {
    
    CardOrders.findAll()
    .then(cardOrders => {
        res.status(200).json(cardOrders)
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving cardOrders' })
    })
})

router.get('/cardOrders/:id', (req, res) => {
    const { id } = req.params;

    CardOrders.findById(id)
    .then(cardOrders => {
        if(cardOrders.id >= 0){
            return res.status(200).json(cardOrders)
        } else {
            return res.status(404).json({ message: 'Error id invalid' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving cardOrder' })
    })
})

router.get('/cardOrders/:userid', (req, res) => {
    const { id } = req.params;

    CardOrders.findByUserId(id)
    .then(cardOrders => {
        if(cardOrders.id >= 0){
            return res.status(200).json(cardOrders)
        } else {
            return res.status(404).json({ message: 'Error id invalid' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving cardOrder' })
    })
})

router.post('/cardOrders', restricted, (req, res) => {
    const data = req.body;

    CardOrders.add(data)
    .then(cardOrders => {
        res.status(201).json(cardOrders)
    })
    .catch(() => {
        res.status(500).json({ message: 'Failed to Create cardOrder'})
    })
})

router.put('/cardOrders/:id', restricted, (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    CardOrders.findById(id)
    .then(cardOrders => {
        if (cardOrders){
            cardOrders.update(changes, id)
            .then(updatedCardOrders => {
                res.status(200).json(updatedCardOrders)
            });
        } else {
            res.status(404).json({ message: 'Could not find specified cardOrder'})
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error updating cardOrder' })
    })
})

router.delete('/cardOrders', restricted, (req, res) => {

    CardOrders.removeAll()
    .then(() => {
        res.status(200).json({ message: 'All cardOrders successfully deleted' })
    })
    .catch(() => {
        res.status(500).json({ message: 'Unable to delete cardOrders' })
    })
})

router.delete('/cardOrders/:id', restricted, (req, res) => {
    const { id } = req.params;

    CardOrders.removeById(id)
    .then(deleted => {
        if(deleted) {
            res.status(200).json({ message: 'cardOrder removed' })
        } else {
            res.status(404).json({ message: 'Could not find specified cardOrder' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error deleting cardOrder' })
    })
})

module.exports = router