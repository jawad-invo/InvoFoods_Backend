const invoice = require('../Controllers/InvoiceController');
const models = require('../models');
const email = require('../Controllers/EmailController');

const { Meal } = models;

async function sendInvoice(user_id, package_name, email) {
    if (package_name == 'weekly') {
        cron.schedule("0 5 */7 * *", function () {
            let total_meals = 0;
            let total_amount = 0;
            // Find all the meals fulfilled against user
            Meal.find({
                where: {
                    user_id: user_id,
                    status: "fulfilled"
                }
            }).then((meals) => {
                // Count the meals and total amount
                total_meals = length(meals);
                total_amount = total_meals * 200;
            })
            // call invoice create method with the data gathered above
            invoice.create(user_id, total_meals, total_amount);
            email.sendEmail()

        });
    }
}

module.exports = { sendInvoice };
