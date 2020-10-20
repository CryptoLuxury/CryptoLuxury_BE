exports.up = function(knex) {
    return knex.schema.createTable('devTicket', devTicket => {
      devTicket.increments();
  
      devTicket
        .string('name', 255)
        .notNullable()
      
      devTicket
        .string('email', 255)
        .notNullable()

      devTicket
        .string('message', 255)
        .notNullable();
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('devTicket');
};