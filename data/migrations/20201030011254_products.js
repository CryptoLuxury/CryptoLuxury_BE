exports.up = function(knex) {
    return knex.schema.createTable('products', products => {
      products.increments();
  
      products
        .string('name', 255)
        .notNullable()

      products
        .string('type')
      
      products
        .decimal('price')
        .notNullable()

      products
        .string('description', 255)
        .notNullable();

      products
        .string('image')
        .notNullable()

      products 
        .string('bitpay')
        .notNullable()
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('products');
};