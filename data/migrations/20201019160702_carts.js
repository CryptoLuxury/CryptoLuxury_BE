exports.up = function(knex) {
    return knex.schema.createTable('carts', carts => {
      carts.increments();
      
      carts
        .integer('card_id')
        .unsigned()
        .references('id')
        .inTable('cards')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      carts
        .integer('watch_id')
        .unsigned()
        .references('id')
        .inTable('watches')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('carts');
};