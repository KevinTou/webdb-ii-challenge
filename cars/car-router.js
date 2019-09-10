const express = require('express');

const Cars = require('../data/db-config.js');

const router = express.Router();

// GET ------ /api/cars ------ GET ALL CARS
router.get('/', (req, res) => {
  Cars('cars')
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'Error occurred while getting all cars.', err: err });
    });
});

// GET ------ /api/cars/:id ------ GET CAR BY ID
router.get('/:id', validateCarId, (req, res) => {
  res.status(200).json(req.car);
});

// POST ------ /api/cars/ ------ ADD A NEW CAR
router.post('/', validateCar, validateUniqueVin, (req, res) => {
  const carData = req.body;

  Cars('cars')
    .insert(carData, 'id')
    .then(([id]) => {
      Cars('cars')
        .where({ id })
        .first()
        .then(car => {
          res.status(201).json(car);
        })
        .catch(err => {
          res.status(500).json({
            message: 'Error occurred while getting car by id.',
            err: err,
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error occurred while adding a new car.',
        err: err,
      });
    });
});

// PUT ------ /api/cars/:id ------ UPDATE CAR BY ID
router.put(
  '/:id',
  validateCarId,
  validateCar,
  validateUniqueVin,
  (req, res) => {
    const changes = req.body;

    Cars('cars')
      .where('id', req.params.id) // select * from `accounts` where `id` = req.params.id
      .update(changes)
      .then(count => {
        // res.status(200).json({ message: `Updated ${count} account(s).` });
        Cars('cars') // return the updated object
          .where('id', req.params.id)
          .first()
          .then(car => {
            if (car) {
              res.status(200).json(car);
            } else {
              res
                .status(404)
                .json({ message: `Car with the id ${id} not found.` });
            }
          })
          .catch(err => {
            res.status(500).json({
              message: 'Error occurred while getting car by id.',
              err: err,
            });
          });
      })
      .catch(err => {
        res.status(500).json({
          message: 'Error occurred while updating an account.',
          err: err,
        });
      });
  },
);

// DELETE ------ /api/cars/:id ------ DELETE CAR BY ID
router.delete('/:id', validateCarId, (req, res) => {
  Cars('cars')
    .where({ id: req.params.id }) // select `id` from `cars` where `id` = 'req.params.id'
    .del()
    .then(count => {
      // res.status(200).json({ message: `Deleted ${count} car(s).` });
      // Return the deleted object instead.
      res.status(200).json({
        message: `Successfully deleted car with the id ${req.params.id}.`,
        deletedCar: req.car,
      });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'Error occurred while deleting car.', err: err });
    });
});

function validateCarId(req, res, next) {
  const { id } = req.params;

  Cars('cars')
    .where({ id })
    .first()
    .then(car => {
      if (car) {
        req.car = car;
        next();
      } else {
        return res
          .status(404)
          .json({ message: `Car with the id ${id} not found.` });
      }
    })
    .catch(err => {
      return res
        .status(500)
        .json({ message: `Error getting car with id ${id}.`, err: err });
    });
}

function validateCar(req, res, next) {
  const carData = req.body;

  if (
    !carData.vin ||
    !carData.make ||
    !carData.model ||
    !Object.keys(carData).includes('mileage')
  ) {
    return res
      .status(400)
      .json({ message: 'Missing vin, make, model, or mileage property.' });
  }

  if (
    typeof carData.vin !== 'string' ||
    typeof carData.make !== 'string' ||
    typeof carData.model !== 'string'
  ) {
    return res
      .status(400)
      .json({ message: 'Invalid data type. Expecting a string.' });
  } else if (typeof carData.mileage !== 'number') {
    return res
      .status(400)
      .json({ message: 'Invalid data type. Expecting a number.' });
  }

  // TODO: Add more validation for other properties (title, status)

  next();
}

function validateUniqueVin(req, res, next) {
  const carData = req.body;

  Cars('cars').then(cars => {
    let notUniqueVin = cars.filter(car => car.vin === carData.vin);

    if (notUniqueVin.length > 0) {
      return res
        .status(400)
        .json({ message: 'There can only be one unique vin number.' });
    } else {
      next();
    }
  });
}

module.exports = router;
