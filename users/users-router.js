const express = require('express');
const restricted = require('../admins/restricted-middleware.js')
const Users = require('./users-model.js')

const router = express.Router()

router.get('/users', restricted, (req, res) => {

    Users.findAll()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving Items' })
    })
})

router.get('/users/:id', restricted, (req, res) => {
    email = req.params.email

    Users.findBy(id)
    .then(user => {
        if(user.id > 0){
            return res.status(200).json(user)
        } else {
            return res.status(404).json({ message: 'Error id invalid' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving user' })
    })
})

router.get('/users/:id', restricted, (req, res) => {
    id = req.params.id

    Users.findById(id)
    .then(user => {
        if(user.id > 0){
            return res.status(200).json(user)
        } else {
            return res.status(404).json({ message: 'Error id invalid' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving user' })
    })
})

router.put('/users/:id', restricted, (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Users.findById(id)
    .then(user => {
        if (user){
            user.update(changes, id)
            .then(updatedUser => {
                res.status(200).json(updatedUser)
            });
        } else {
            res.status(404).json({ message: 'Could not find specified user'})
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error updating user' })
    })
})

router.delete('/users', restricted, (req, res) => {

    Users.removeAll()
    .then(() => {
        res.status(200).json({ message: 'All users successfully deleted' })
    })
    .catch(() => {
        res.status(500).json({ message: 'Unable to delete boosts' })
    })
})

router.delete('/users/:id', restricted, (req, res) => {
    const { id } = req.params;

    Users.remove(id)
    .then(deleted => {
        if(deleted) {
            res.status(200).json({ message: 'user Removed' })
        } else {
            res.status(404).json({ message: 'Could not find specified user' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error deleting user' })
    })
})

module.exports = router