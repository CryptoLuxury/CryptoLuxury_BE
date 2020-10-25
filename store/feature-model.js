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
    return db('feature')
}

function findById(id) {
    return db('feature')
        .where({ id })
        .first()
}

function add(data){
    return db('feature')
        .insert(data)
}

function update(changes, id){
    return db('feature')
        .update(changes)
        .where({ id })
}

function removeAll(){
    return db('feature')
        .del()
}

function removeById(id){
    return db('feature')
        .where({ id })
        .del()
}