const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    fromTime: String,
    toTime: String,
    appointee_name: String,
    status: Boolean
});

const Appointement = mongoose.model('appointment',appointmentSchema);

module.exports = Appointement;
