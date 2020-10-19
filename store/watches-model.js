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
    return db('watches')
}

function findById(id) {
    return db('watches')
        .where({ id })
        .first()
}

function add(data){
    return db('watches')
        .insert(data)
}

function update(changes, id){
    return db('watches')
        .update(changes)
        .where({ id })
}

function removeAll(){
    return db('watches')
        .del()
}

function removeById(id){
    return db('watches')
        .where({ id })
        .del()
}