
const req = require('express/lib/request');
const models = require('../models');
const BookingModel = models.Booking;


async function create(req, res) {
    try {

        await BookingModel.create({
            user_id: req.body.id,
            schedule_id: req.body.id,
            status: "pending"
        }).then(result => res.status(201).send(result));

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
                user_id: req.body.user_id
            }
        })
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