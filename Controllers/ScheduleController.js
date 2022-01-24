const { Op } = require('sequelize');
const { now } = require('sequelize/dist/lib/utils');
const models = require('../models');

const ScheduleModel = models.Schedule;

async function create(req, res) {
  try {
    await ScheduleModel.create({
      flight_id: req.body.flight_id,
      take_of_at: req.body.take_of_at,
      land_in_at: req.body.land_in_at,
      class_id: req.body.class_id,
      place: req.body.place,
    }).then((result) => {
      res.status(201).send(result);
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

const associatedModels = [
  {
    model: models.Class,
    attributes: ['name'],
  },
  {
    model: models.Flight,
    attributes: ['name', 'plane_number', 'total_seats', 'seats_left'],
  },
];

async function get(req, res) {
  try {
    let result;

    if (req.body.from && req.body.to) {
      result = await ScheduleModel.findAll({
        where: {
          take_of_at: { [Op.gte]: req.body.from, [Op.lte]: req.body.to },
        },
        include: associatedModels,
      });
    } else if (req.body.place) {
      result = await ScheduleModel.findAll({
        where: { place: req.body.place },
        include: associatedModels,
      });
    } else if (req.body.take_of_at) {
      result = await ScheduleModel.findAll({
        where: { take_of_at: req.body.take_of_at },
        include: associatedModels,
      });
    } else if (req.body.from) {
      result = await ScheduleModel.findAll({
        where: { take_of_at: { [Op.gte]: req.body.from, [Op.lte]: now() } },
        include: associatedModels,
      });
    } else if (req.body.class) {
      result = await ScheduleModel.findAll({
        where: { class_id: req.body.class_id },
        include: associatedModels,
      });
    } else {
      result = await ScheduleModel.findAll({
        include: associatedModels,
      });
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function update(req, res) {
  try {
    await ScheduleModel.update(
      {
        flight_id: req.body.flight_id && req.body.flight_id,
        take_of_at: req.body.take_of_at && req.body.take_of_at,
        land_in_at: req.body.land_in_at && req.body.land_in_at,
        class_id: req.body.class_id && req.body.class_id,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    ).then((result) => {
      if (result === 1) {
        res.status(200).send({ message: 'Schedule Updated!' });
      } else {
        res.status(400).send({ message: 'Update Failed!' });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function remove(req, res) {
  try {
    await ScheduleModel.destroy({
      where: {
        id: req.body.id,
      },
    }).then((result) => {
      if (result === 1) {
        res.status(200).send({ message: 'Schedule deleted!' });
      } else {
        res.status(400).send({ message: 'Operation Failed!' });
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  create,
  get,
  update,
  remove,
};
