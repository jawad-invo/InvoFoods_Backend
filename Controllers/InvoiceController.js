const models = require('../models');

const { Invoice } = models;

async function create(user_id, meals, total_amount) {
    try {

        Invoice.create({
            user_id: user_id,
            total_meals: meals,
            amount: total_amount,
            payment_proof: null,
            status: "pending",
        }).then((invoice) => {
            res.status(201).send({
                message: 'Invoice created',
                invoice,
            });
        });
    } catch (error) {
        res.status(500).send({ message: error.errors });
    }
}

async function get(req, res) {
    try {

        await Invoice.findAll().then((result) =>
            res.status(200).send(result)
        );

    } catch (error) {
        res.status(500).send(error);
    }
}

async function update(req, res) {
    try {
        await Invoice.update(
            // {
            //   name: req.body.name && req.body.name,
            //   plane_number: req.body.plane_number && req.body.plane_number,
            //   total_seats: req.body.total_seats && req.body.total_seats,
            //   class_id: req.body.class_id && req.body.class_id,
            // },
            {
                where: {
                    id: req.body.id,
                },
            }
        ).then((result) => res.status(200).send(result));
    } catch (error) {
        res.status(500).send(error);
    }
}


async function destroy(req, res) {
    try {
        await Invoice.destroy({
            where: {
                id: req.body.id,
            },
        }).then(res.status(200).send({ message: 'Invoice deleted successfully!' }));
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    create,
    update,
    destroy,
    get,
};

