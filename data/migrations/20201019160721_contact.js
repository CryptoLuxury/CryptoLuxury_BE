exports.up = function(knex) {
    return knex.schema.createTable('contact', contact => {
      contact.increments();
  
      contact
        .string('name', 255)
        .notNullable()
      
      contact
        .string('email', 255)
        .notNullable()

      contact
        .string('message', 255)
        .notNullable();
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('contact');
};