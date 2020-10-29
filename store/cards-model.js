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
    return db('cards')
}

function findById(cardId) {
    return db('cards')
        .where({ cardId })
        .first()
}

function add(data){
    return db('cards')
        .insert(data)
}

function update(changes, id){
    return db('cards')
        .update(changes)
        .where({ id })
}

function removeAll(){
    return db('cards')
        .del()
}

function removeById(id){
    return db('cards')
        .where({ id })
        .del()
}