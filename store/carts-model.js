const db = require('../data/dbConfig.js')

module.exports = {
    findAll,
    findById,
    findByUserId,
    add,
    update,
    removeAll,
    removeById
}

function findAll(){
    return db('carts')
}

function findById(id) {
    return db('carts')
        .where({ id })
        .first()
}

function findByUserId(user_id) {
    return db('carts')
        .where({ user_id })
        .first()
}

function add(data){
    return db('carts')
        .insert(data)
}

function update(changes, id){
    return db('carts')
        .update(changes)
        .where({ id })
}

function removeAll(){
    return db('carts')
        .del()
}

function removeById(id){
    return db('carts')
        .where({ id })
        .del()
}