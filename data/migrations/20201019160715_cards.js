exports.up = function(knex) {
    return knex.schema.createTable('cards', cards => {
      cards.increments();
  
      cards
        .string('title', 255)
        .notNullable()
      
      cards
        .integer('price')
        .notNullable()

      cards
        .string('description', 255)
        .notNullable();

      cards
        .string('sku')
        .notNullable();

      cards 
        .string('bitpay')
        .notNullable()
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cards');
};