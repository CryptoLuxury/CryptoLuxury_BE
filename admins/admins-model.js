const db = require('../data/dbConfig.js');

module.exports = {
  findAll,
  findBy,
  findById,
  add,
  update,
  remove
}

function findAll(){
  return db('admins')
}

function findBy(filter) {
  return db('admins').where(filter);
}

async function add(user) {
  const [id] = await db('admins').insert(user);

  return (user);
}

function findById(id) {
  return db('admins')
    .where({ id })
    .first();
}

function update(changes, id){
  return db('admins')
      .update(changes)
      .where({ id })
}

function remove(id){
  return db('admins')
      .where({ id })
      .del()
}
