exports.up = function(knex) {
    return knex.schema.createTable('carts', carts => {
      carts.increments();
  
      carts
        .string('items', 255)
      
      carts
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('carts');
};