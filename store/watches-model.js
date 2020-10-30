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

function findById(watchId) {
    return db('watches')
        .where({ watchId })
        .first()
}

function add(data){
    return db('watches')
        .insert(data)
}

function update(changes, watchId){
    return db('watches')
        .update(changes)
        .where({ watchId })
}

function removeAll(){
    return db('watches')
        .del()
}

function removeById(watchId){
    return db('watches')
        .where({ watchId })
        .del()
}