const models = require('../models');
const FlightModel = models.Flight;

async function create(req, res) {
    try {
        await FlightModel.create({
            name: req.body.name,
            plane_number: req.body.plane_number,
            total_seats: req.body.total_seats,
            seats_left: req.body.seats_left,
            class_id: req.body.class_id,
        }).then(result => res.status(201).send(result));

    } catch (error) {
        res.status(500).send(error);
    }
}

async function get(req, res) {
    try {
        if (req.body.id) {
            await FlightModel.findAll({
                where: {
                    id: req.body.id
                }
            }).then(result => res.status(200).send(result));
        }
        else {
            await FlightModel.findAll().then(result => res.status(200).send(result));
        }

    } catch (error) {
        res.status(500).send(error);
    }
}

async function update(req, res) {
    try {

        await FlightModel.update({
            name: req.body.name && req.body.name,
            plane_number: req.body.plane_number && req.body.plane_number,
            total_seats: req.body.total_seats && req.body.total_seats,
            class_id: req.body.class_id && req.body.class_id
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

        await FlightModel.destroy({
            where: {
                id: req.body.id
            }
        }).then(res.status(200).send({ message: "Flight deleted successfully!" }));

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    create,
    update,
    remove,
    get
}