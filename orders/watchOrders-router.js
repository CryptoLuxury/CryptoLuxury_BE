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

router.get('/watchOrders/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    try {
        WatchOrders.findByUserId(user_id)
        .then(watchOrders => {
            res.status(200).json(watchOrders)
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error Retrieving watchOrder', error: err.message })
        })
    }
    catch(err){
        res.status(500).json({ error: err.message })
    }
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
            .then(updatedWatchOrders => {
                res.status(200).json(updatedWatchOrders)
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