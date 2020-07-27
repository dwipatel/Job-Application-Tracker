const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    company: { type: String, required: true },
    title: { type: String, required: true },
    link: { type: String, required: true },
    date: { type: Date, required: true },
    notes: { type: String, required: false },
    userID: { type: String, required: true },
}, {
    timestamps: true,
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;