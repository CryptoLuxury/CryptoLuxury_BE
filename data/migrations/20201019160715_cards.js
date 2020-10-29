exports.up = function(knex) {
    return knex.schema.createTable('cards', cards => {
      cards.increments();
  
      cards
        .string('name', 255)
        .notNullable()
      
      cards
        .decimal('price')
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