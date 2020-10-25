const express = require('express');
const restricted = require('../admins/restricted-middleware')
const Feature = require('./feature-model')

const router = express.Router()

router.get('/features', (req, res) => {
    
    Feature.findAll()
    .then(features => {
        res.status(200).json(features)
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving featured items' })
    })
})

router.get('/features/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    Feature.findByUserId(user_id)
    .then(features => {
            return res.status(200).json(features)
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving featured item' })
    })
})

router.post('/features', (req, res) => {
    const data = req.body;

    Feature.add(data)
    .then(features => {
        res.status(201).json(features)
    })
    .catch(() => {
        res.status(500).json({ message: 'Failed to Create featured item'})
    })
})

router.put('/features/:id', (req, res) => {
    const id  = req.params.id;
    const changes = req.body;

    Feature.findById(id)
    .then(features => {
        if (features){
            Feature.update(changes, id)
            .then(updatedFeatures => {
                res.status(200).json(updatedFeatures)
            });
        } else {
            res.status(404).json({ message: 'Could not find specified featured item'})
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error updating featured item' })
    })
})

router.delete('/features', (req, res) => {

    Feature.removeAll()
    .then(() => {
        res.status(200).json({ message: 'All featured items successfully deleted' })
    })
    .catch(() => {
        res.status(500).json({ message: 'Unable to delete featured item' })
    })
})

router.delete('/features/:id', (req, res) => {
    const id  = req.params.id;

    Feature.removeById(id)
    .then(deleted => {
        if(deleted) {
            res.status(200).json({ message: 'feature removed' })
        } else {
            res.status(404).json({ message: 'Could not find specified feature' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error deleting feature' })
    })
})

module.exports = router