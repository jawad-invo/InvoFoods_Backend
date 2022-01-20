const models = require('../models');
const ScheduleModel = models.Schedule;
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator");



async function create(req, res) {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            res.status(400).send(validationErrors);
        }

        ScheduleModel.create({
            flight_id: req.body.flight_id,
            take_of_at: req.body.take_of_at,
            land_in_at: req.body.land_in_at,
            class_id: req.body.class_id,
        }).then(schedule => res.status(201).send(schedule));

    } catch (error) {
        res.status(500).send(error);
    }
}

// Get Schedule for a specific date or get schedule between two dates
async function get(req, res) {
    try {
        if (req.body.from || req.body.to) {
            await ScheduleModel.findAll({
                where: {
                    take_of_at: {
                        [Op.gte]: req.body.from,
                        [Op.lte]: req.body.to
                    }
                }
            }).then(schedules => res.status(200).send(schedules));
        }
        else {
            await ScheduleModel.findAll({
                where: {
                    take_of_at: req.body.take_of_at
                }
            }).then(schedules => res.status(200).send(schedules));
        }

    } catch (error) {
        res.status(500).send(error);
    }
}

async function update(req, res) {
    try {

        await ScheduleModel.update({
            flight_id: req.body.flight_id ? req.body.flight_id : null,
            take_of_at: req.body.take_of_at ? req.body.take_of_at : null,
            land_in_at: req.body.land_in_at ? req.body.land_in_at : null,
            class_id: req.body.class_id ? req.body.class_id : null
        }, {
            where: {
                id: req.body.id
            }
        }
        ).then(result => res.status(200).send(result));

    } catch (error) {
        res.status(500).send(error);
    }
}

async function remove(req, res) {
    try {

        await ScheduleModel.destroy({
            where: {
                id: req.body.id
            }
        }).then(message => res.status(200).send({message:"Schedule deleted successfully!"}));

    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    create,
    get,
    update,
    remove
}

