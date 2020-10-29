exports.up = function(knex) {
    return knex.schema.createTable('cards', cards => {
      cards.increments('cardId');
  
      cards
        .string('name', 255)
        .notNullable()
      
      cards
        .integer('price')
        .notNullable()

      cards
        .string('description', 255)
        .notNullable();

      cards 
        .string('bitpay')
        .notNullable()
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cards');
};