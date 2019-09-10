exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    // id, primary key, auto-increment, integer
    tbl.increments();

    // vin, string (17), unique, required(notNullable)
    tbl
      .string('vin', 17)
      .unique()
      .notNullable();

    // make, string, required(notNullable)
    tbl.string('make').notNullable();

    // model, string, required(notNullable)
    tbl.string('model').notNullable();

    // mileage, integer, required(notNullable)
    tbl.integer('mileage').notNullable();

    // vin, string, not required(nullable)
    tbl.string('transmissionType').nullable();

    // vin, string, not required(nullable)
    tbl.string('statusOfTitle').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
