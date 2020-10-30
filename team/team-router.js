const express = require('express');
const restricted = require('../admins/restricted-middleware')
const Team = require('./team-model')

const router = express.Router()

router.get('/team', (req, res) => {
    
    Team.findAll()
    .then(team => {
        res.status(200).json(team)
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving teams' })
    })
})

router.get('/team/:id', (req, res) => {
    const id  = req.params.id;

    Team.findById(id)
    .then(team => {
        if(team.id >= 0){
            return res.status(200).json(team)
        } else {
            return res.status(404).json({ message: 'Error id invalid' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving team' })
    })
})

router.post('/team', restricted, (req, res) => {
    const data = req.body;

    Team.add(data)
    .then(team => {
        res.status(201).json(team)
    })
    .catch(() => {
        res.status(500).json({ message: 'Failed to Create team'})
    })
})

router.put('/team/:id', restricted, (req, res) => {
    const id  = req.params.id;
    const changes = req.body;

    Team.findById(id)
    .then(team => {
        if (team){
            Team.update(changes, id)
            .then(updatedTeam => {
                res.status(200).json(updatedTeam)
            });
        } else {
            res.status(404).json({ message: 'Could not find specified team'})
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error updating team' })
    })
})

router.delete('/team', restricted, (req, res) => {

    Team.removeAll()
    .then(() => {
        res.status(200).json({ message: 'All teams successfully deleted' })
    })
    .catch(() => {
        res.status(500).json({ message: 'Unable to delete teams' })
    })
})

router.delete('/team/:id', restricted, (req, res) => {
    const id  = req.params.id;

    Team.removeById(id)
    .then(deleted => {
        if(deleted) {
            res.status(200).json({ message: 'team removed' })
        } else {
            res.status(404).json({ message: 'Could not find specified team' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error deleting team' })
    })
})

module.exports = router