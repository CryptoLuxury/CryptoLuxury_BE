exports.up = function(knex) {
    return knex.schema.createTable('superadmin', superadmin => {
      superadmin.increments();
  
      superadmin
        .string('username', 255)
        .notNullable()
        .unique();
      
      superadmin.string('password', 255)
        .notNullable()
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('superadmin');
};