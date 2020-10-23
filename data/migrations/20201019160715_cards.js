exports.up = function(knex) {
    return knex.schema.createTable('cards', cards => {
      cards.increments();
  
      cards
        .string('title', 255)
        .notNullable()
      
      cards
        .string('price', 255)
        .notNullable()

      cards
        .string('description', 255)
        .notNullable();

      cards
        .string('quantity')
        .notNullable();

      cards 
        .string('bitpay')
        .notNullable()
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cards');
};