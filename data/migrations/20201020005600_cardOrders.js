exports.up = function(knex) {
    return knex.schema.createTable('cardOrders', cardOrders => {
      cardOrders.increments();
      
      cardOrders
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      cardOrders
        .integer('card_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('cards')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cardOrders');
};