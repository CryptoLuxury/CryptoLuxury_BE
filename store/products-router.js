const express = require('express');
const restricted = require('../admins/restricted-middleware')
const Products = require('./products-model')

const router = express.Router()

router.get('/products', (req, res) => {
    
    Products.findAll()
    .then(products => {
        res.status(200).json(products)
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving products' })
    })
})

router.get('/products/:id', (req, res) => {
    const id  = req.params.id;

    Products.findById(id)
    .then(products => {
        if(products.id >= 0){
            return res.status(200).json(products)
        } else {
            return res.status(404).json({ message: 'Error id invalid' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving product' })
    })
})

router.post('/products', restricted, (req, res) => {
    const data = req.body;

    Products.add(data)
    .then(products => {
        res.status(201).json(products)
    })
    .catch(() => {
        res.status(500).json({ message: 'Failed to Create product'})
    })
})

router.put('/products/:id', restricted, (req, res) => {
    const id  = req.params.id;
    const changes = req.body;

    Products.findById(id)
    .then(products => {
        if (products){
            Products.update(changes, id)
            .then(updatedProducts => {
                res.status(200).json(updatedProducts)
            });
        } else {
            res.status(404).json({ message: 'Could not find specified product'})
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error updating product' })
    })
})

router.delete('/products', restricted, (req, res) => {

    Products.removeAll()
    .then(() => {
        res.status(200).json({ message: 'All products successfully deleted' })
    })
    .catch(() => {
        res.status(500).json({ message: 'Unable to delete products' })
    })
})

router.delete('/products/:id', restricted, (req, res) => {
    const id  = req.params.id;

    Products.removeById(id)
    .then(deleted => {
        if(deleted) {
            res.status(200).json({ message: 'product removed' })
        } else {
            res.status(404).json({ message: 'Could not find specified product' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error deleting product' })
    })
})

module.exports = router