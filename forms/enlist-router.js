const express = require('express');
const restricted = require('../admins/restricted-middleware')
const Enlist = require('./enlist-model')

const router = express.Router()

router.get('/enlist', restricted, (req, res) => {
    
    Enlist.findAll()
    .then(enlist => {
        res.status(200).json(enlist)
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving enlists' })
    })
})

router.get('/enlist/:id', restricted, (req, res) => {
    const id  = req.params.id;

    Enlist.findById(id)
    .then(enlist => {
        if(enlist.id >= 0){
            return res.status(200).json(enlist)
        } else {
            return res.status(404).json({ message: 'Error id invalid' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving enlist' })
    })
})

router.post('/enlist', (req, res) => {
    const data = req.body;

    Enlist.add(data)
    .then(enlist => {
        res.status(201).json(enlist)
    })
    .catch(() => {
        res.status(500).json({ message: 'Failed to Create enlist'})
    })
})

router.put('/enlist/:id', restricted, (req, res) => {
    const id  = req.params.id;
    const changes = req.body;

    Enlist.findById(id)
    .then(enlist => {
        if (enlist){
            Enlist.update(changes, id)
            .then(updatedEnlist => {
                res.status(200).json(updatedEnlist)
            });
        } else {
            res.status(404).json({ message: 'Could not find specified enlist'})
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error updating enlist' })
    })
})

router.delete('/enlist', restricted, (req, res) => {

    Enlist.removeAll()
    .then(() => {
        res.status(200).json({ message: 'All enlists successfully deleted' })
    })
    .catch(() => {
        res.status(500).json({ message: 'Unable to delete enlists' })
    })
})

router.delete('/enlist/:id', restricted, (req, res) => {
    const id  = req.params.id;

    Enlist.removeById(id)
    .then(deleted => {
        if(deleted) {
            res.status(200).json({ message: 'enlist removed' })
        } else {
            res.status(404).json({ message: 'Could not find specified enlist' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error deleting enlist' })
    })
})

module.exports = router