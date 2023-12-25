const StaffTransactionPoint = require('../models/staffTransactionPointModel')
const Department = require('../models/departmentModel')
const url = require('url')
const {
  encryptPassword,
  decryptPassword,
} = require('../utils/password_encrypt_decrypt_helper')
const jwt = require('jsonwebtoken')

/*
@ method: post
@ desc: adding a staff by the logged in department either initialiser or in transit agencies
@ access: private
*/

async function addStaff(req, res) {
  try {
    const departmentId = req.department._id // this is the id of loggedin department who is currently making the entry of this courier to their department (can be initiator as well as middle ones)
    const department = await Department.findById(departmentId).select(
      '-password'
    )

    const staffDetails = req.body.staffDetails
    const existingStaff = await StaffTransactionPoint.findById(staffDetails._id)
      // .populate('senderDetails')
      // .populate('receiverDetails')
    if (existingStaff) {
      // if courier exist already that means this courier department is the middle one in courier transit journey
      // change status and all etc. functionalities
      if (Object.values(existingStaff.transactionPoint).includes(departmentId)) {
        return res.status(400).json({
          status: 'failure',
          message: 'Staff already entered',
          data: existingStaff,
        })
      }

      // const midStatus = `Package arrived at ${department.name}, ${department.location}, ${department.city}`

      // var getDate = Date.now().toString()
      // existingCourier.tracker[getDate] = departmentId
      // existingCourier.departmentStatus[departmentId] = 'Accepted'
      const staff = await StaffTransactionPoint.findById(staffDetails._id)

      // await sendEmail(
      //   existingCourier._id,
      //   existingCourier.receiverDetails.email,
      //   url.parse(req.headers.referer).host
      // )

      return res.status(204).json({
        status: 'success',
        message: 'Staff Entry Successful',
        data: staff,
      })
    } else {
      // brand new courier no receiver/sender details yet so create one from req
      var sender = req.body.senderDetails
      var senderDetails = await Customer.findOne({
        email: sender.email,
      })
      if (!senderDetails) {
        senderDetails = await new Customer(sender).save()
      }

      const sd = senderDetails.toObject()
      delete sd._id
      delete sd.__v

      if (
        !(
          Object.entries(sender).sort().toString() ===
          Object.entries(sd).sort().toString()
        )
      ) {
        return res.status(400).json({
          status: 'failure',
          message:
            'Return Customer - Sender details does not match with the email associated',
          data: {},
        })
      }

      var receiver = req.body.receiverDetails
      var receiverDetails = await Customer.findOne({
        email: receiver.email,
      })
      if (!receiverDetails) {
        receiverDetails = await new Customer(receiver).save()
      }

      const rd = receiverDetails.toObject()
      delete rd._id
      delete rd.__v

      if (
        !(
          Object.entries(receiver).sort().toString() ===
          Object.entries(rd).sort().toString()
        )
      ) {
        return res.status(400).json({
          status: 'failure',
          message:
            'Return Customer - Receiver details does not match with the email associated',
          data: {},
        })
      }

      const initialStatus = `Packed at ${department.name}, ${department.location}, ${department.city}`
      var getDate = Date.now().toString()
      const trackerObject = {}
      trackerObject[getDate] = departmentId
      const initialTracker = trackerObject
      const depStatus = {}
      depStatus[departmentId] = 'Accepted'

      const courier = await new Courier({
        senderDetails: senderDetails._id,
        receiverDetails: receiverDetails._id,
        packageName: courierDetails.packageName,
        packageWeight: courierDetails.packageWeight,
        status: initialStatus,
        departmentStatus: depStatus,
        tracker: initialTracker,
      }).save()

      await sendEmail(
        courier._id,
        receiverDetails.email,
        url.parse(req.headers.referer).host
      )

      return res.status(201).json({
        status: 'success',
        message: 'Courier Entry Successful',
        data: courier,
      })
    }
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: 'Something went wrong !' })
  }
}

/*
@ method: post
@ desc: login of courier agency
@ access: public
*/

async function loginStaffTransaction(req, res) {
  // const departmentPinCode = req.body.departmentPinCode
  const staffInputPassword = req.body.password
  const phoneNumber = req.body.phoneNumber

  try {
    const staffTransaction = await StaffTransactionPoint.findOne({
      phoneNumber: phoneNumber,
    })

    if (!staffTransaction) {
      return res.status(404).json({
        status: 'failure',
        message: 'No staff found with given credentials',
        data: {},
      })
    }

    const loggedInStaffTransaction = { _id: staffTransaction._id }
    const accessToken = jwt.sign(loggedInStaffTransaction, process.env.JWT_SECRET)

    const decryptedPasswordDB = await decryptPassword(
      staffInputPassword,
      staffTransaction.password
    )

    if (decryptedPasswordDB) {
      return res.status(200).json({
        status: 'success',
        message: 'Login Success',
        data: { accessToken },
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
@ method: get
@ desc: get all staffs for a department
@ access: private
*/

async function getAllStaffs(req, res) {
  try {
    var departmentPinCode = req.departmentPinCode
    var allStaffs = await StaffTransactionPoint.find()
    // .populate('senderDetails')
    // .populate('receiverDetails')

    const resultingAllDepartmentStaffs = []

    for (const staff of allStaffs) {
      if (staff.departmentPinCode != departmentPinCode) {
        resultingAllDepartmentStaffs.push(staff)
      }
    }

    return res.status(200).json({
      status: 'success',
      message: 'Staffs Fetched Successful',
      data: resultingAllDepartmentStaffs.reverse(),
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: 'Something went wrong !' })
  }
}

module.exports = {
  loginStaffTransaction,
  getAllStaffs,
}