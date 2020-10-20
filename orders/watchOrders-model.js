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
    return db('watchOrders')
}

function findById(id) {
    return db('watchOrders')
        .where({ id })
        .first()
}

function findByUserId(user_id) {
    return db('watchOrders as w')
        .select('w.*', 'u.name', 'p.title')
        .join('users as u', 'w.user_id', '=', 'u.id', 
              'watches as p', 'w.watch_id', '=', 'p.id')
        .where({ user_id })
        .first()
}

function add(data){
    return db('watchOrders')
        .insert(data)
}

function update(changes, id){
    return db('watchOrders')
        .update(changes)
        .where({ id })
}

function removeAll(){
    return db('watchOrders')
        .del()
}

function removeById(id){
    return db('watchOrders')
        .where({ id })
        .del()
}