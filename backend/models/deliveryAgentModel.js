const mongoose = require('mongoose')

const deliveryAgentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    default: 'New Delhi',
  },
  state: {
    type: String,
    required: true,
    default: 'Delhi',
  },
  country: {
    type: String,
    required: true,
    default: 'India',
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true
  },
})

module.exports = mongoose.model('DeliveryAgent', deliveryAgentSchema)
