const mongoose = require('mongoose')

const staffWarehouseSchema = new mongoose.Schema({
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
	warehouseId: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'DeliveryAgent',
	},

	password: {
		type: String,
		require: true,
	},


})

module.exports = mongoose.model('StaffWarehouse', staffWarehouseSchema)