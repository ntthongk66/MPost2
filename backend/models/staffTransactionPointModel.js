const mongoose = require('mongoose')

const staffTransactionPointSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phoneNumber: {
        type: Number,
        require: true,
    },
    departmentPinCode: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        require: true,
    },


})

module.exports = mongoose.model('StaffTransactionPoint', staffTransactionPointSchema)