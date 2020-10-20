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
    return db('devTicket')
}

function findById(id) {
    return db('devTicket')
        .where({ id })
        .first()
}

function add(data){
    return db('devTicket')
        .insert(data)
}

function update(changes, id){
    return db('devTicket')
        .update(changes)
        .where({ id })
}

function removeAll(){
    return db('devTicket')
        .del()
}

function removeById(id){
    return db('devTicket')
        .where({ id })
        .del()
}