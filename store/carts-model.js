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
    return db('carts as c')
        .select('c.id', 'cd.name as cardName', 'cd.price as cardPrice', 'cd.description as cardDesc', 'cd.quantity as cardQty', 'w.name as watchName', 'w.price as watchPrice', 'w.description as watchDesc', 'w.quantity as watchQty')
        .join('cards as cd', 'c.card_id', '=', 'cd.id')
        .join('watches as w', 'c.watch_id', '=', 'w.id')
        .where({ user_id })
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