const express = require('express');
const restricted = require('../admins/restricted-middleware')
const DevTicket = require('./devTicket-model')

const router = express.Router()

router.get('/devTicket', restricted, (req, res) => {
    
    DevTicket.findAll()
    .then(devTicket => {
        res.status(200).json(devTicket)
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving devTickets' })
    })
})

router.get('/devTicket/:id', restricted, (req, res) => {
    const { id } = req.params;

    DevTicket.findById(id)
    .then(devTicket => {
        if(devTicket.id >= 0){
            return res.status(200).json(devTicket)
        } else {
            return res.status(404).json({ message: 'Error id invalid' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving devTicket' })
    })
})

router.post('/devTicket', (req, res) => {
    const data = req.body;

    DevTicket.add(data)
    .then(devTicket => {
        res.status(201).json(devTicket)
    })
    .catch(() => {
        res.status(500).json({ message: 'Failed to Create devTicket'})
    })
})

router.put('/devTicket/:id', restricted, (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    DevTicket.findById(id)
    .then(devTicket => {
        if (devTicket){
            devTicket.update(changes, id)
            .then(updatedDevTicket => {
                res.status(200).json(updatedDevTicket)
            });
        } else {
            res.status(404).json({ message: 'Could not find specified devTicket'})
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error updating devTicket' })
    })
})

router.delete('/devTicket', restricted, (req, res) => {

    DevTicket.removeAll()
    .then(() => {
        res.status(200).json({ message: 'All devTickets successfully deleted' })
    })
    .catch(() => {
        res.status(500).json({ message: 'Unable to delete devTickets' })
    })
})

router.delete('/devTicket/:id', restricted, (req, res) => {
    const { id } = req.params;

    DevTicket.removeById(id)
    .then(deleted => {
        if(deleted) {
            res.status(200).json({ message: 'devTicket removed' })
        } else {
            res.status(404).json({ message: 'Could not find specified devTicket' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error deleting devTicket' })
    })
})

module.exports = router