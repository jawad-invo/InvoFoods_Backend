const models = require('../models');
const job = require('../Jobs/sendInvoice');

const { Subscriber } = models;

async function create(req, res) {
    try {

        Subscriber.create({
            user_id: req.body.user_id,
            menu_id: req.body.menu_id,
            package_name: req.body.package_name,
        }).then((subscribers) => {
            if (subscribers != null) {
                // Cron Job that will dispatch at the end of the subscribed period
                job.sendInvoice(req.body.user_id, req.body.package_name, req.body.email);
            }
            res.status(201).send({
                message: 'Menu created',
                subscribers,
            });
        });
    } catch (error) {
        res.status(500).send({ message: error.errors });
    }
}

async function get(req, res) {
    try {
        if (req.body.menu_id) {
            await Subscriber.findAll({
                where: {
                    menu_id: req.body.menu_id
                }
            }).then((result) =>
                res.status(200).send(result)
            );
        } else {
            await Subscriber.findAll().then((result) => res.status(200).send(result));
        }

    } catch (error) {
        res.status(500).send(error);
    }
}

async function update(req, res) {
    try {
        await Subscriber.update(
            {
                menu_id: req.body.menu_id && req.body.menu_id,
                package_name: req.body.package_name && req.body.package_name,
            },
            {
                where: {
                    id: req.body.id,
                },
            }
        ).then((result) => {
            if (result == 1) {
                res.status(200).send({ message: "Subscription updated" });
            } else {
                res.status(200).send({ message: "Nothing updated" });
            }
        });
    } catch (error) {
        res.status(500).send(error);
    }
}


async function destroy(req, res) {
    try {
        await Subscriber.destroy({
            where: {
                id: req.body.id,
            },
        }).then(res.status(200).send({ message: 'Subscriber deleted successfully!' }));
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

