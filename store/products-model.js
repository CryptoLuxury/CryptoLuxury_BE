const db = require('../data/dbConfig.js')

module.exports = {
    findAll,
    findById,
    add,
    update,
    removeAll,
    removeById
}

function findAll(){
    return db('products')
}

function findById(id) {
    return db('products')
        .where({ id })
        .first()
}

function add(data){
    return db('products')
        .insert(data)
}

function update(changes, id){
    return db('products')
        .update(changes)
        .where({ id })
}

function removeAll(){
    return db('products')
        .del()
}

function removeById(id){
    return db('products')
        .where({ id })
        .del()
}