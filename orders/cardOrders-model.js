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
    return db('cardOrders')
}

function findById(id) {
    return db('cardOrders')
        .where({ id })
        .first()
}

function findByUserId(user_id) {
    return db('cardOrders')
        .select('c.*', 'users.name')
        .join('users', 'c.user_id', '=', 'users.id')
        // .join('cards as p', 'c.card_id', '=', 'p.id')
        .where({ user_id })
}

function add(data){
    return db('cardOrders')
        .insert(data)
}

function update(changes, id){
    return db('cardOrders')
        .update(changes)
        .where({ id })
}

function removeAll(){
    return db('cardOrders')
        .del()
}

function removeById(id){
    return db('cardOrders')
        .where({ id })
        .del()
}