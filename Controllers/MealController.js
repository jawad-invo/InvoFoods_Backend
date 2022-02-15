const models = require('../models');

const { Meal } = models;
const { Subscriber } = models;

async function create(req, res) {
    try {

        var meals = [];
        await Subscriber.findOne(
            {
                where: { menu_id: req.body.menu_id }
            }
        ).then((result) => {

            var today = new Date();

            if (result.package_name == 'weekly') {
                for (var i = 0; i <= 7; i++) {
                    let meal = {
                        user_id: req.body.user_id,
                        menu_id: req.body.menu_id,
                        date: (today.getMonth() + 1) + '/' + (today.getDate() + i) + '/' + today.getFullYear(),
                        status: "",
                    }
                    meals.push(meal);
                }
            }
        });

        Meal.bulkCreate(meals).then((meals) => {
            res.status(201).send({
                message: 'Menu created',
                meals,
            });
        });
    } catch (error) {
        res.status(500).send({ message: error.errors });
    }
}

async function get(req, res) {
    try {

        if (req.body.user_id) {
            await Meal.findAll({

                where: {
                    user_id: req.body.user_id
                }
            }).then((result) =>
                res.status(200).send(result)
            );
        } else {
            await Meal.findAll({}).then((result) =>
                res.status(200).send(result)
            );
        }


    } catch (error) {
        res.status(500).send(error);
    }
}

async function update(req, res) {
    try {
        await Meal.update(
            {
                status: req.body.status && req.body.status,
            },
            {
                where: {
                    id: req.body.id,
                },
            }
        ).then((result) => {
            if (result == 1) {
                res.status(200).send({ message: "Meal updated" })
            } else {
                res.status(200).send({ message: "Nothing updated" })
            }
        });
    } catch (error) {
        res.status(500).send(error);
    }
}


async function destroy(req, res) {
    try {
        await Meal.destroy({
            where: {
                id: req.body.id,
            },
        }).then(res.status(200).send({ message: 'Meal deleted successfully!' }));
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

