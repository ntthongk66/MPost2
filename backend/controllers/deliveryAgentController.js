require('dotenv').config()

const DeliveryAgent = require('../models/deliveryAgentModel')
const Courier = require('../models/courierModel')
const StaffWarehouse = require('../models/staffWarehouseModel')
const {
  encryptPassword,
  decryptPassword,
} = require('../utils/password_encrypt_decrypt_helper')
const jwt = require('jsonwebtoken')

/*
@ method: post
@ desc: login of delivery agent
@ access: public
*/
async function loginDeliveryAgent(req, res) {
  const email = req.body.email
  const deliveryAgentInputPassword = req.body.password

  try {
    const deliveryAgent = await DeliveryAgent.findOne({
      email: email,
    })

    if (!deliveryAgent) {
      return res.status(404).json({
        status: 'failure',
        message: 'No delivery agent found with given credentials',
        data: {},
      })
    }

    const loggedInDeliveryAgent = { _id: deliveryAgent._id }
    const accessToken = jwt.sign(loggedInDeliveryAgent, process.env.JWT_SECRET)
    const decryptedPasswordDB = await decryptPassword(
      deliveryAgentInputPassword,
      deliveryAgent.password
    )

    if (decryptedPasswordDB) {
      const delAgent = deliveryAgent.toObject()
      delete delAgent.password

      // console.log(delAgent)
      
      return res.status(200).json({
        status: 'success',
        message: 'Login Success',
        data: { deliveryAgent: delAgent, accessToken },
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

/*
@ method: post
@ desc: add courier entry through courier _id
@ access: private
*/
async function addEntryDeliveryAgent(req, res) {
  try {
    const deliveryAgentId = req.deliveryAgent._id
    // console.log(req)
    const courierId = req.body._id
    const courier = await Courier.findById(courierId)
    if (!courier) {
      return res.status(404).json({
        status: 'failure',
        message: 'Courier not found',
        data: {},
      })
    }

    if (deliveryAgentId == courier.deliveryAgent) {
      return res.status(400).json({
        status: 'failure',
        message: 'Courier already entered',
        data: {},
      })
    }

    if (courier.deliveryAgent && deliveryAgentId != courier.deliveryAgent) {
      return res.status(400).json({
        status: 'failure',
        message: 'Courier already assigned to different delivery agent',
        data: {},
      })
    }

    await Courier.findByIdAndUpdate(courierId, {
      deliveryAgent: deliveryAgentId,
      pickupDate: new Date(),
    })

    return res.status(200).json({
      status: 'success',
      message: 'Courier added for delivery',
      data: {},
    })
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong !' })
  }
}

/*
@ method: post
@ desc: update courier as delivered
@ access: private
*/
async function markDeliveredByDeliveryAgent(req, res) {
  try {
    const deliveryAgentId = req.deliveryAgent._id
    const courierId = req.body._id
    const courier = await Courier.findById(courierId)
    if (!courier) {
      return res.status(404).json({
        status: 'failure',
        message: 'Courier not found',
        data: {},
      })
    }

    if (deliveryAgentId != courier.deliveryAgent) {
      return res.status(400).json({
        status: 'failure',
        message:
          'Courier not assigned or already assigned to different delivery agent',
        data: {},
      })
    }

    if (courier.deliveredDate) {
      return res.status(400).json({
        status: 'failure',
        message: 'Courier already delivered',
        data: {},
      })
    }

    await Courier.findByIdAndUpdate(courierId, {
      status: 'Delivered',
      deliveredDate: new Date(),
    })

    return res.status(200).json({
      status: 'success',
      message: 'Courier delivered',
      data: {},
    })
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong !' })
  }
}

/*
@ method: post
@ desc: add a staff at warehouse
@ access: private
*/

async function addStaffWarehouse(req, res) {
  try {
    console.log(req.body.staffDetails.phoneNumber)
    const warehouseId = req.deliveryAgent._id

    console.log(warehouseId)
    // const department = await Department.findById(departmentId).select(
    //   '-password'
    // )

    const StaffExist = await StaffWarehouse.findOne({
      phoneNumber: req.body.staffDetails.phoneNumber,
    })


    // const pinCodeDepartmentExit = await Department.findOne({
    //   pinCode = 
    // })


    if (StaffExist) {
      return res.status(400).json({
        status: 'failure',
        message: 'StaffTransaction with given registration number already exists',
        data: {},
      })
    }
    if (!req.body.staffDetails.password) {
      return res.status(400).json({
        status: 'failure',
        message: 'Invalid Password Input',
        data: {},
      })
    }
    const securePassword = await encryptPassword(req.body.staffDetails.password)
    if (securePassword === null) {
      return res.status(500).json({
        status: 'failure',
        message: 'Password Encryption failed',
        data: {},
      })
    }
    const staffWarehouse = new StaffWarehouse({
      name: req.body.staffDetails.name,
      email: req.body.staffDetails.email,
      phoneNumber: req.body.staffDetails.phoneNumber,
      password: securePassword,
      warehouseId: warehouseId,
    })

    const newStaff = await staffWarehouse.save()

    // const loggedInStaff = { _id: staffTransactionPoint._id }
    // const accessToken = jwt.sign(loggedInStaff, process.env.JWT_SECRET)

    return res.status(201).json({
      status: 'success',
      message: 'StaffTransaction added successfully',
      data: {  }, //{accesstoken}
    }) // 201 => creation success
  } catch (error) {
    return res.status(400).json({ message: error.message }) // 400 => invalid user inputs
  }
}

/*
@ method: patch
@ desc: update profile of staff
@ access: private
*/
async function updateStaffProfile(req, res) {
  try {
    const warehouseId = req.deliveryAgent._id // this is the id of loggedin department who is currently making the entry of this courier to their department (can be initiator as well as middle ones)

    if (!warehouseId) {
      return res.status(403).json({
        status: 'failure',
        message: 'Unauthorized',
        data: {},
      })
    }
    const staffDetails = req.body.staffDetails
    const staff = await StaffWarehouse.findById(staffDetails._id)

    if (!staff) {
      return res.status(404).json({
        status: 'failure',
        message: 'Staff not found',
        data: {},
      })
    } else {
      // courier.departmentStatus[departmentId] = courierDetails.status
      await StaffWarehouse.findByIdAndUpdate(staffDetails._id, {
        name: staffDetails.name,
        email: staffDetails.email,
        phoneNumber: staffDetails.phoneNumber,
      })

      return res.status(204).json({
        status: 'success',
        message: 'Staff Update Successful',
        data: {},
      })
    }

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: 'Something went wrong !' })
  }
}

/*
@ method: get
@ desc: get all couriers for a department
@ access: private
*/
async function getAllCouriers(req, res) {
  try {
    var warehouseId = req.deliveryAgent._id
    var allCouriers = await Courier.find()
      .populate('senderDetails')
      .populate('receiverDetails')

    const resultingAllWarehouseCouriers = []

    for (const courier of allCouriers) {
      if (Object.values(courier.tracker).includes(departmentId)) {
        resultingAllWarehouseCouriers.push(courier)
      }
    }

    return res.status(200).json({
      status: 'success',
      message: 'Couriers Fetched Successful',
      data: resultingAllWarehouseCouriers.reverse(),
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: 'Something went wrong !' })
  }
}


module.exports = {
  loginDeliveryAgent,
  addEntryDeliveryAgent,
  markDeliveredByDeliveryAgent,
  addStaffWarehouse,
  updateStaffProfile,
}