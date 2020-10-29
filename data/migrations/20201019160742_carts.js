exports.up = function(knex) {
    return knex.schema.createTable('carts', carts => {
      carts.increments();

      carts
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      
      carts
        .integer('card_id')
        .unsigned()
        .references('cardId')
        .inTable('cards')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      carts
        .integer('watch_id')
        .unsigned()
        .references('watchId')
        .inTable('watches')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('carts');
};