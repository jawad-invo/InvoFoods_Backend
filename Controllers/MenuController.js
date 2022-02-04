const models = require('../models');
const { Menu } = models;

async function create(req, res) {
    try {
        const sampleFile = req.files.menu_image;
        uploadPath = 'uploads/' + sampleFile.name;
        sampleFile.mv(uploadPath, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            Menu.create({
                name: req.body.name,
                items: req.body.items,
                menu_image: uploadPath
            }).then((menu) => {
                res.status(201).send({
                    message: 'Menu created',
                    menu,
                });
            });

        });
    } catch (error) {
        res.status(500).send({ message: error.errors });
    }
}

async function get(req, res) {
    try {

        await Menu.findAll().then((result) => {
            res.status(200).send(result)
        }
        );

    } catch (error) {
        res.status(500).send(error);
    }
}

async function update(req, res) {
    try {
        var uploadPath = '';
        if (req.files.menu_image) {
            const sampleFile = req.files.menu_image;
            uploadPath = 'uploads/' + sampleFile.name;
            sampleFile.mv(uploadPath, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
        }

        await Menu.update(
            {
                name: req.body.name && req.body.name,
                items: req.body.items && req.body.items,
                menu_image: req.files.menu_image && uploadPath,
            },
            {
                where: {
                    id: req.body.id,
                },
            }
        ).then((result) => {
            if (result == 1) {
                res.send({ message: "Update successfull" });
            } else {
                res.send({ message: "Nothing Updated" });
            }
        })
    } catch (error) {
        res.status(500).send(error);
    }
}

async function destroy(req, res) {
    try {
        await Menu.destroy({
            where: {
                id: req.body.id,
            },
        }).then(res.status(200).send({ message: 'Menu deleted successfully!' }));
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

