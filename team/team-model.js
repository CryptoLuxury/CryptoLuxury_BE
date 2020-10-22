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
    return db('team')
}

function findById(id) {
    return db('team')
        .where({ id })
        .first()
}

function add(data){
    return db('team')
        .insert(data)
}

function update(changes, id){
    return db('team')
        .update(changes)
        .where({ id })
}

function removeAll(){
    return db('team')
        .del()
}

function removeById(id){
    return db('team')
        .where({ id })
        .del()
}