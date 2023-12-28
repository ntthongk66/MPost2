const StaffWarehouse = require('../models/staffWarehouseModel')
const DeliveryAgent = require('../models/deliveryAgentModel')
const url = require('url')
const {
	encryptPassword,
	decryptPassword,
} = require('../utils/password_encrypt_decrypt_helper')
const jwt = require('jsonwebtoken')

async function getAllStaffs(req, res) {
  try {
		// console.log(req)
    var warehouseId = req.deliveryAgent._id
		// console.log('warehouseId', req.DeliveryAgent._id)
    var allStaffs = await StaffWarehouse.find()
    // .populate('senderDetails')
    // .populate('receiverDetails')

    const resultingAllWarehouseStaffs = []

    for (const staff of allStaffs) {
      if (staff.warehouseId._id == warehouseId) {
        resultingAllWarehouseStaffs.push(staff)
      }
    }

    return res.status(200).json({
      status: 'success',
      message: 'Staffs Fetched Successful',
      data: resultingAllWarehouseStaffs.reverse(),
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: 'Something went wrong !' })
  }
}

module.exports = {
	getAllStaffs,
}