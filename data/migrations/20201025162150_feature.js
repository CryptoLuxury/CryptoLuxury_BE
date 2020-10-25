exports.up = function(knex) {
    return knex.schema.createTable('feature', feature => {
      feature.increments();
  
      feature
        .string('image', 255)
        .notNullable()
      
      feature
        .string('title', 255)
        .notNullable()

      feature
        .string('subtitle', 255)
        .notNullable();
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('feature');
};