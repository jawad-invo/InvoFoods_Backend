const models = require('../models');
const multer = require('multer')

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

        if (req.body.user_id) {
            await Invoice.findOne({
                where: {
                    user_id: req.body.user_id
                }
            }).then((result) =>
                res.status(200).send(result)
            );
        } else {
            await Invoice.findAll().then((result) =>
                res.status(200).send(result)
            );
        }


    } catch (error) {
        res.status(500).send(error);
    }
}

async function update(req, res) {
    try {

        await Invoice.update({
            status: req.body.status
        }, {
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


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

var upload = multer({ storage: storage });

async function uploadFile(req, res) {
    try {
        upload.single('proof');
        res.json(req.files);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    create,
    update,
    destroy,
    get,
    uploadFile
};

