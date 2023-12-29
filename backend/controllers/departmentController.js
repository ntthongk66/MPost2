require('dotenv').config()

const Department = require('../models/departmentModel')
const StaffTransactionPoint = require('../models/staffTransactionPointModel')
const {
  encryptPassword,
  decryptPassword,
} = require('../utils/password_encrypt_decrypt_helper')
const jwt = require('jsonwebtoken')

/*
@ method: post
@ desc: registration of courier agency
@ access: public
*/

async function addDepartment(req, res) {
  try {
    console.log(req.body.registrationNumber)
    const departmentExist = await Department.findOne({
      registrationNumber: req.body.registrationNumber,
    })
    if (departmentExist) {
      return res.status(400).json({
        status: 'failure',
        message: 'Department with given registration number already exists',
        data: {},
      })
    }
    if (!req.body.password) {
      return res.status(400).json({
        status: 'failure',
        message: 'Invalid Password Input',
        data: {},
      })
    }
    const securePassword = await encryptPassword(req.body.password)
    if (securePassword === null) {
      return res.status(500).json({
        status: 'failure',
        message: 'Password Encryption failed',
        data: {},
      })
    }
    const department = new Department({
      name: req.body.name,
      location: req.body.location,
      registrationNumber: req.body.registrationNumber,
      contactEmail: req.body.contactEmail,
      contactNumber: req.body.contactNumber,
      password: securePassword,
      city: req.body.city,
      state: req.body.state,
      pinCode: req.body.pinCode,
      country: req.body.country,
    })

    const newDepartment = await department.save()

    const loggedInDepartment = { _id: department._id }
    const accessToken = jwt.sign(loggedInDepartment, process.env.JWT_SECRET)

    return res.status(201).json({
      status: 'success',
      message: 'Department added successfully',
      data: { accessToken },
    }) // 201 => creation success
  } catch (error) {
    return res.status(400).json({ message: error.message }) // 400 => invalid user inputs
  }
}

/*
@ method: post
@ desc: login of courier agency
@ access: public
*/
async function loginDepartment(req, res) {
  const regNo = req.body.registrationNumber
  const userInputPassword = req.body.password

  try {
    const department = await Department.findOne({
      registrationNumber: regNo,
    })

    if (!department) {
      return res.status(404).json({
        status: 'failure',
        message: 'No department found with given credentials',
        data: {},
      })
    }

    const loggedInDepartment = { _id: department._id }
    const accessToken = jwt.sign(loggedInDepartment, process.env.JWT_SECRET)

    const decryptedPasswordDB = await decryptPassword(
      userInputPassword,
      department.password
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
@ desc: profile of courier agency
@ access: private
*/
async function getDepartmentProfile(req, res) {
  try {
    const departmentId = req.department._id
    const department = await Department.findById(departmentId).select(
      '-password'
    )
    if (department) {
      return res.status(200).json({
        status: 'success',
        message: 'Department found successfully',
        data: department,
      })
    }

    return res.status(404).json({
      status: 'failure',
      message: 'Department not found',
      data: {},
    })
  } catch (error) {
    return new Error(error.message)
  }
}

/*
@ method: patch
@ desc: update profile of courier agency
@ access: private
*/
async function updateDepartmentProfile(req, res) {
  try {
    const departmentId = req.department._id
    const currentDepartment = await Department.findByIdAndUpdate(
      departmentId,
      req.body
    )

    const updatedDepartment = await Department.findById(
      currentDepartment._id
    ).select('-password')

    if (updatedDepartment) {
      return res.status(200).json({
        status: 'success',
        message: 'updated successfully',
        data: updatedDepartment,
      })
    }

    return res.status(404).json({
      status: 'failure',
      message: 'Department not found',
      data: {},
    })
  } catch (error) {
    return new Error(error.message)
  }
}


/*
@ method: post
@ desc: add a staff at transactionpoint
@ access: private
*/

async function addStaffTransactionPoint(req, res) {
  try {
    console.log(req.body.staffDetails.phoneNumber)
    const departmentId = req.department._id

    console.log(departmentId)
    // const department = await Department.findById(departmentId).select(
    //   '-password'
    // )

    const StaffExist = await StaffTransactionPoint.findOne({
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
    const staffTransactionPoint = new StaffTransactionPoint({
      name: req.body.staffDetails.name,
      email: req.body.staffDetails.email,
      phoneNumber: req.body.staffDetails.phoneNumber,
      departmentPinCode: req.body.staffDetails.departmentPinCode,
      password: securePassword,
      transactionPointId: departmentId,
    })

    const newStaff = await staffTransactionPoint.save()

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
    const departmentId = req.department._id // this is the id of loggedin department who is currently making the entry of this courier to their department (can be initiator as well as middle ones)

    if (!departmentId) {
      return res.status(403).json({
        status: 'failure',
        message: 'Unauthorized',
        data: {},
      })
    }
    const staffDetails = req.body.staffDetails
    const staff = await StaffTransactionPoint.findById(staffDetails._id)

    if (!staff) {
      return res.status(404).json({
        status: 'failure',
        message: 'Staff not found',
        data: {},
      })
    } else {
      // courier.departmentStatus[departmentId] = courierDetails.status
      await StaffTransactionPoint.findByIdAndUpdate(staffDetails._id, {
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

async function deleteStaffTransactionPoint (req, res) {
	const staffTransactionPointDetails = req.body.staffTransactionPointDetails
	const id = staffTransactionPointDetails._id
	// alert(id)
	await StaffTransactionPoint.deleteOne({
		_id: id
	})
	.then(data => {
		res.status(201).json({
			status: 'success',
			message: 'Delete successfully!',
			data: {}
		})
	})
	.catch(error => {
		console.log(error.message)
		return res.status(500).json({ 
			status: 'failure',
			message: 'Something went wrong !',
			data: {} 
		})
	})
}

module.exports = {
  addDepartment,
  loginDepartment,
  getDepartmentProfile,
  updateDepartmentProfile,
  addStaffTransactionPoint,
  updateStaffProfile,
  deleteStaffTransactionPoint
}