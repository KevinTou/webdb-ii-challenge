exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    // id, primary key, auto-increment, integer
    tbl.increments();

    // vin, string (128), unique, required(notNullable)
    tbl
      .string('vin', 128)
      .unique()
      .notNullable();

    // make, string (128), required(notNullable)
    tbl.string('make', 128).notNullable();

    // model, string (128), required(notNullable)
    tbl.string('model', 128).notNullable();

    // mileage, integer, required(notNullable)
    tbl.integer('mileage').notNullable();

    // vin, string (128), not required(nullable)
    tbl.string('transmissionType').nullable();

    // vin, string (128), not required(nullable)
    tbl.string('statusOfTitle').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
