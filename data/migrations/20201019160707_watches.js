exports.up = function(knex) {
    return knex.schema.createTable('watches', watches => {
      watches.increments();
  
      watches
        .string('title', 255)
        .notNullable()
      
      watches
        .string('price', 255)
        .notNullable()

      watches
        .string('description', 255)
        .notNullable();

      watches
        .string('quantity')
        .notNullable();

      watches
        .string('bitpay')
        .notNullable()
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('watches');
};