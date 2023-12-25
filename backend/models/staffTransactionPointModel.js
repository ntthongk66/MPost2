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
        type: String,
        require: true,
    },
    departmentPinCode: {
        type: Number,
        required: true,
    },

    transactionPointId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'Department',
    },

    password: {
        type: String,
        require: true,
    },


})

module.exports = mongoose.model('StaffTransactionPoint', staffTransactionPointSchema)