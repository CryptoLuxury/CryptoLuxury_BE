const express = require('express');
const restricted = require('../admins/restricted-middleware')
const Watches = require('./watches-model')

const router = express.Router()

router.get('/watches', (req, res) => {
    
    Watches.findAll()
    .then(watches => {
        res.status(200).json(watches)
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving watches' })
    })
})

router.get('/watches/:watchId', (req, res) => {
    const watchId  = req.params.watchId;

    Watches.findById(watchId)
    .then(watches => {
        if(watches.watchId >= 0){
            return res.status(200).json(watches)
        } else {
            return res.status(404).json({ message: 'Error watchId invalid' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving watch' })
    })
})

router.post('/watches', (req, res) => {
    const data = req.body;

    Watches.add(data)
    .then(watches => {
        res.status(201).json(watches)
    })
    .catch(() => {
        res.status(500).json({ message: 'Failed to Create watch'})
    })
})

router.put('/watches/:watchId', (req, res) => {
    const watchId  = req.params.watchId;
    const changes = req.body;

    Watches.findById(watchId)
    .then(watches => {
        if (watches){
            Watches.update(changes, watchId)
            .then(updatedWatch => {
                res.status(200).json(updatedWatch)
            });
        } else {
            res.status(404).json({ message: 'Could not find specified watch'})
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error updating watch' })
    })
})

router.delete('/watches', (req, res) => {

    Watches.removeAll()
    .then(() => {
        res.status(200).json({ message: 'All watches successfully deleted' })
    })
    .catch(() => {
        res.status(500).json({ message: 'Unable to delete watches' })
    })
})

router.delete('/watches/:watchId', (req, res) => {
    const watchId  = req.params.watchId;

    Watches.removeById(watchId)
    .then(deleted => {
        if(deleted) {
            res.status(200).json({ message: 'watch removed' })
        } else {
            res.status(404).json({ message: 'Could not find specified watch' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error deleting watch' })
    })
})

module.exports = router