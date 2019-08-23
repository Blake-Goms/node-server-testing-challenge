const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

function insert(hobbit) {
  return db('hobbits').insert(hobbit, 'id');
}

function findById(id) {
  return db('hobbits').where({ id });
}

function update(changes, id) {
  return db('hobbits').where({ id }).update(changes);
}

function remove(id) {
  return db('hobbits').where({ id }).delete(id);
}

function getAll() {
  return db('hobbits');
}

