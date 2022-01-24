const models = require('../models');

const ScheduleModel = models.Schedule;

async function checkSchedule(req, res, next) {
  try {
    await ScheduleModel.find({
      where: {
        id: req.body.schedule_id,
      },
    }).then((result) => {
      if (result == null)
        res.status(200).send({ message: 'Invalid Schedule ID' });
      next();
    });
  } catch (error) {
    res.status(500).send(error);
  }
}
module.exports = {
  checkSchedule,
};
