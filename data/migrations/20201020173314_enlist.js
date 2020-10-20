exports.up = function(knex) {
    return knex.schema.createTable('enlist', enlist => {
      enlist.increments();
  
      enlist
        .string('email', 255)
        .notNullable()
        .unique();
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('enlist');
};