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
    return db('contact')
}

function findById(id) {
    return db('contact')
        .where({ id })
        .first()
}

function add(data){
    return db('contact')
        .insert(data)
}

function update(changes, id){
    return db('contact')
        .update(changes)
        .where({ id })
}

function removeAll(){
    return db('contact')
        .del()
}

function removeById(id){
    return db('contact')
        .where({ id })
        .del()
}