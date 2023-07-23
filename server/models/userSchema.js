const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    'name': String,
    'price': Number,
    'datetime': String,
    'description': String
});

const transaction = mongoose.model("transaction", transactionSchema);

module.exports = transaction;