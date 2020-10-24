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

router.get('/cardOrders/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    try {
        CardOrders.findByUserId(user_id)
        .then(cardOrders => {
            res.status(200).json(cardOrders)
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error Retrieving cardOrder', error: err.message })
        })
    }
    catch (err){
        res.status(500).json({ error: err.message })
    }
})

router.post('/cardOrders', (req, res) => {
    const data = req.body;

    CardOrders.add(data)
    .then(cardOrders => {
        res.status(201).json(cardOrders)
    })
    .catch(() => {
        res.status(500).json({ message: 'Failed to Create cardOrder'})
    })
})

router.put('/cardOrders/:id', (req, res) => {
    const id  = req.params.id;
    const changes = req.body;

    CardOrders.findById(id)
    .then(cardOrders => {
        if (cardOrders){
            CardOrders.update(changes, id)
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

router.delete('/cardOrders', (req, res) => {

    CardOrders.removeAll()
    .then(() => {
        res.status(200).json({ message: 'All cardOrders successfully deleted' })
    })
    .catch(() => {
        res.status(500).json({ message: 'Unable to delete cardOrders' })
    })
})

router.delete('/cardOrders/:id', (req, res) => {
    const id  = req.params.id;

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