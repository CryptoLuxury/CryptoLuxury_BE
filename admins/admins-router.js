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
    const id  = req.params.id

    Admin.findById(id)
    .then(admin => {
        if(admin.id > 0){
            return res.status(200).json(admin)
        } else {
            return res.status(404).json({ message: 'Error id invalid' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving admin' })
    })
})

router.put('/admins/:id', (req, res) => {
    const id  = req.params.id;
    const changes = req.body;

    Admin.findById(id)
    .then(admin => {
        if (admin){
            Admin.update(changes, id)
            .then(updatedAdmin => {
                res.status(200).json(updatedAdmin)
            });
        } else {
            res.status(404).json({ message: 'Could not find specified admin'})
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error updating admin' })
    })
})

router.delete('/admins/:id', (req, res) => {
    const id  = req.params.id;

    Admin.remove(id)
    .then(deleted => {
        if(deleted) {
            res.status(200).json({ message: 'admin Removed' })
        } else {
            res.status(404).json({ message: 'Could not find specified admin' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error deleting admin' })
    })
})

module.exports = router