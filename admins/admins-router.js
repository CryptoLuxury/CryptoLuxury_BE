const express = require('express');
const restricted = require('./restricted-middleware.js')
const Admin = require('./admins-model.js')

const router = express.Router()

router.get('/admins', (req, res) => {

    Admin.findAll()
    .then(admins => {
        res.status(200).json(admins)
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving Items' })
    })
})

router.get('/admins/:id', (req, res) => {
    id = req.params.id

    Admin.findById(id)
    .then(user => {
        if(user.id > 0){
            return res.status(200).json(user)
        } else {
            return res.status(404).json({ message: 'Error id invalid' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving admin' })
    })
})

router.put('/admins/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Admin.findById(id)
    .then(user => {
        if (user){
            admin.update(changes, id)
            .then(updatedAdmin => {
                res.status(200).json(updatedAdmin)
            });
        } else {
            res.status(404).json({ message: 'Could not find specified user'})
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error updating user' })
    })
})

router.delete('/admins/:id', (req, res) => {
    const { id } = req.params;

    Admin.remove(id)
    .then(deleted => {
        if(deleted) {
            res.status(200).json({ message: 'admin Removed' })
        } else {
            res.status(404).json({ message: 'Could not find specified user' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error deleting admin' })
    })
})

module.exports = router