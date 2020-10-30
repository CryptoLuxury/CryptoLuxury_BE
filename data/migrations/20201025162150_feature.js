exports.up = function(knex) {
    return knex.schema.createTable('feature', feature => {
      feature.increments();
  
      feature
        .string('image', 255)
        .notNullable()
      
      feature
        .string('title', 20)
        .notNullable()

      feature
        .string('link')
        .notNullable()
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('feature');
};