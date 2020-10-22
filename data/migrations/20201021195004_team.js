exports.up = function(knex) {
    return knex.schema.createTable('team', team => {
      team.increments();
  
      team
        .string('name', 255)
        .notNullable()
      
      team
        .string('role', 255)
        .notNullable()
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('team');
};