const express = require('express');
const restricted = require('../admins/restricted-middleware')
const WatchOrders = require('./watchOrders-model')

const router = express.Router()

router.get('/watchOrders', (req, res) => {
    
    WatchOrders.findAll()
    .then(watchOrders => {
        res.status(200).json(watchOrders)
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving watchOrders' })
    })
})

router.get('/watchOrders/:id', (req, res) => {
    const { id } = req.params;

    WatchOrders.findById(id)
    .then(watchOrders => {
        if(watchOrders.id >= 0){
            return res.status(200).json(watchOrders)
        } else {
            return res.status(404).json({ message: 'Error id invalid' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving watchOrder' })
    })
})

router.get('/watchOrders/:userid', (req, res) => {
    const { id } = req.params;

    WatchOrders.findByUserId(id)
    .then(watchOrders => {
        if(watchOrders.id >= 0){
            return res.status(200).json(watchOrders)
        } else {
            return res.status(404).json({ message: 'Error id invalid' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving watchOrder' })
    })
})

router.post('/watchOrders', (req, res) => {
    const data = req.body;

    WatchOrders.add(data)
    .then(watchOrders => {
        res.status(201).json(watchOrders)
    })
    .catch(() => {
        res.status(500).json({ message: 'Failed to Create watchOrder'})
    })
})

router.put('/watchOrders/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    WatchOrders.findById(id)
    .then(watchOrders => {
        if (watchOrders){
            watchOrders.update(changes, id)
            .then(updatedwatchOrders => {
                res.status(200).json(updatedwatchOrders)
            });
        } else {
            res.status(404).json({ message: 'Could not find specified watchOrder'})
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error updating watchOrder' })
    })
})

router.delete('/watchOrders', (req, res) => {

    WatchOrders.removeAll()
    .then(() => {
        res.status(200).json({ message: 'All watchOrders successfully deleted' })
    })
    .catch(() => {
        res.status(500).json({ message: 'Unable to delete watchOrders' })
    })
})

router.delete('/watchOrders/:id', (req, res) => {
    const { id } = req.params;

    WatchOrders.removeById(id)
    .then(deleted => {
        if(deleted) {
            res.status(200).json({ message: 'watchOrder removed' })
        } else {
            res.status(404).json({ message: 'Could not find specified watchOrder' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error deleting watchOrder' })
    })
})

module.exports = router