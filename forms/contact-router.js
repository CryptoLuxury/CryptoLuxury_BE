const express = require('express');
const restricted = require('../admins/restricted-middleware')
const Contact = require('./contact-model')

const router = express.Router()

router.get('/contact', (req, res) => {
    
    Contact.findAll()
    .then(contact => {
        res.status(200).json(contact)
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving contacts' })
    })
})

router.get('/contact/:id', (req, res) => {
    const id  = req.params.id;

    Contact.findById(id)
    .then(contact => {
        if(contact.id >= 0){
            return res.status(200).json(contact)
        } else {
            return res.status(404).json({ message: 'Error id invalid' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving contact' })
    })
})

router.post('/contact', (req, res) => {
    const data = req.body;

    Contact.add(data)
    .then(contact => {
        res.status(201).json(contact)
    })
    .catch(() => {
        res.status(500).json({ message: 'Failed to Create contact'})
    })
})

router.put('/contact/:id', (req, res) => {
    const id  = req.params.id;
    const changes = req.body;

    Contact.findById(id)
    .then(contact => {
        if (contact){
            Contact.update(changes, id)
            .then(updatedContact => {
                res.status(200).json(updatedContact)
            });
        } else {
            res.status(404).json({ message: 'Could not find specified contact'})
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error updating contact' })
    })
})

router.delete('/contact', (req, res) => {

    Contact.removeAll()
    .then(() => {
        res.status(200).json({ message: 'All contacts successfully deleted' })
    })
    .catch(() => {
        res.status(500).json({ message: 'Unable to delete contacts' })
    })
})

router.delete('/contact/:id', (req, res) => {
    const id  = req.params.id;

    Contact.removeById(id)
    .then(deleted => {
        if(deleted) {
            res.status(200).json({ message: 'contact removed' })
        } else {
            res.status(404).json({ message: 'Could not find specified contact' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error deleting contact' })
    })
})

module.exports = router