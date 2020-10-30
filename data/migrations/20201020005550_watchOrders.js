exports.up = function(knex) {
    return knex.schema.createTable('watchOrders', watchOrders => {
      watchOrders.increments();

      watchOrders
        .integer('watch_id')
        .unsigned()
        .notNullable()
        .references('watchId')
        .inTable('watches')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('watchOrders');
};