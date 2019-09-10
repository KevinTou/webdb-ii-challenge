exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .truncate() // resets the id primary key
    .then(function() {
      // Inserts seed entries
      return knex('cars').insert([
        {
          vin: 'JH4DA9350NS005381',
          make: 'Acura',
          model: 'Integra',
          mileage: 123451,
          transmissionType: 'Manual',
          statusOfTitle: 'clean',
        },
        {
          vin: '2FTHF25H6LCB36173',
          make: 'Ford',
          model: 'F 250',
          mileage: 223451,
          statusOfTitle: 'salvage',
        },
        {
          vin: '2G1WH55K5Y9322458',
          make: 'Chevy',
          model: 'Impala',
          mileage: 302101,
        },
        {
          vin: '5J6RM4850CL703159',
          make: 'Honda',
          model: 'CR-V EX',
          mileage: 92821,
          transmissionType: 'Automatic',
          statusOfTitle: 'clean',
        },
      ]);
    });
};
