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
    return db('enlist')
}

function findById(id) {
    return db('enlist')
        .where({ id })
        .first()
}

function add(data){
    return db('enlist')
        .insert(data)
}

function update(changes, id){
    return db('enlist')
        .update(changes)
        .where({ id })
}

function removeAll(){
    return db('enlist')
        .del()
}

function removeById(id){
    return db('enlist')
        .where({ id })
        .del()
}