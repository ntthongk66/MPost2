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

async function loginStaffWarehouse(req, res) {
  // const departmentPinCode = req.body.departmentPinCode
  const staffInputPassword = req.body.password
  const Email = req.body.email
  console.log(Email)

  try {
    const staffWarehouse = await StaffWarehouse.findOne({
      email:  Email,
    })

    // console.log(staffWarehouse)
    if (!staffWarehouse) {
      return res.status(404).json({
        status: 'failure',
        message: 'No staff found with given credentials',
        data: {},
      })
    }

    const loggedInStaffWarehouse = { _id: staffWarehouse.warehouseId._id, staffId: staffWarehouse._id }
    ///////////
    const accessToken = jwt.sign(loggedInStaffWarehouse, process.env.JWT_SECRET)

    const decryptedPasswordDB = await decryptPassword(
      staffInputPassword,
      staffWarehouse.password
    )

    if (decryptedPasswordDB) {
      const staffWh = staffWarehouse.toObject()
      delete staffWh.password
      return res.status(200).json({
        status: 'success',
        message: 'Login Success',
        data: {staffWarehouse: staffWh, accessToken },
      })
    } else {
      return res.status(401).json({
        status: 'failure',
        message: 'Incorrect Password',
        data: {},
      })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message }) // 400 => invalid user inputs
  }
}

module.exports = {
	getAllStaffs,
  loginStaffWarehouse,
}