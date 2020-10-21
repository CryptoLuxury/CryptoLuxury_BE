exports.up = function(knex) {
    return knex.schema.createTable('watchOrders', watchOrders => {
      watchOrders.increments();
      
      watchOrders
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      watchOrders
        .integer('watch_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('watches')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      watchOrders
        .string('status')
        .notNullable()
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('watchOrders');
};