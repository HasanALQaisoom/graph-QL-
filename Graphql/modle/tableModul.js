const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tableReserveSchema = new Schema({
    tableNumber: {type: Number, default: 0 ,required: true},
    phoneNumber: {type: Number, required: true},
    date: {type: Date, default: Date.now()}
}, { timestamps: true });

module.exports = mongoose.model('tableReserve',tableReserveSchema);