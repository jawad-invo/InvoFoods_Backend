const req = require('express/lib/request');
const models = require('../models');
const BookingModel = models.Booking;
const FlightModel = models.Flight;



async function create(req, res) {
    try {

        await BookingModel.create({
            user_id: req.body.user_id,
            schedule_id: req.body.schedule_id
        }).then((result) => {
            if (result) {
                // await FlightModel.update({
                //     seats_left = 
                // })
            }
            res.status(201).send(result)
        });

    } catch (error) {
        res.status(500).send(error);
    }
}

async function update(req, res) {
    try {
        await BookingModel.update({
            schedule_id: req.body.shedule.id,
            where: {
                id: req.body.id
            }
        }).then(result => res.status(200).send(result));
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getBookingDetails(req, res) {
    try {
        await BookingModel.findOne({
            where: {
                user_id: req.body.user_id
            },
            include: {
                model: models.Schedule,
                include: [{
                    model: models.Class,
                    attributes: ['name']
                }, {
                    model: models.Flight,
                    attributes: ["name", "plane_number", "total_seats", "seats_left"]
                }]
            }
        }).then(result => res.status(200).send(result))
    } catch (error) {
        res.status(500).send(error);
    }
}

async function deleteBooking(req, res) {
    try {
        await BookingModel.destroy({
            where: {
                id: req.body.id,
                user_id: req.body.user_id
            }
        }).then(res.status(200).send({ message: "Booking deleted successfully!" }));
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    create,
    update,
    getBookingDetails,
    deleteBooking
}