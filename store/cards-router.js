const express = require('express');
const restricted = require('../admins/restricted-middleware')
const Cards = require('./cards-model')

const router = express.Router()

router.get('/cards', restricted, (req, res) => {
    
    Cards.findAll()
    .then(cards => {
        res.status(200).json(cards)
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving cards' })
    })
})

router.get('/cards/:id', restricted, (req, res) => {
    const { id } = req.params;

    Cards.findById(id)
    .then(cards => {
        if(cards.id >= 0){
            return res.status(200).json(cards)
        } else {
            return res.status(404).json({ message: 'Error id invalid' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving card' })
    })
})

router.post('/cards', (req, res) => {
    const data = req.body;

    Cards.add(data)
    .then(cards => {
        res.status(201).json(cards)
    })
    .catch(() => {
        res.status(500).json({ message: 'Failed to Create card'})
    })
})

router.put('/cards/:id', restricted, (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Cards.findById(id)
    .then(cards => {
        if (cards){
            cards.update(changes, id)
            .then(updatedCards => {
                res.status(200).json(updatedCards)
            });
        } else {
            res.status(404).json({ message: 'Could not find specified card'})
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error updating card' })
    })
})

router.delete('/cards', restricted, (req, res) => {

    Cards.removeAll()
    .then(() => {
        res.status(200).json({ message: 'All cards successfully deleted' })
    })
    .catch(() => {
        res.status(500).json({ message: 'Unable to delete cards' })
    })
})

router.delete('/cards/:id', restricted, (req, res) => {
    const { id } = req.params;

    Cards.removeById(id)
    .then(deleted => {
        if(deleted) {
            res.status(200).json({ message: 'card removed' })
        } else {
            res.status(404).json({ message: 'Could not find specified card' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error deleting card' })
    })
})

module.exports = router