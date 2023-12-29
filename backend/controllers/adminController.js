require('dotenv').config()

const Admin = require('../models/adminModel')
const Department = require('../models/departmentModel')
const DeliveryAgent = require('../models/deliveryAgentModel')
const {
	encryptPassword,
	decryptPassword,
} = require('../utils/password_encrypt_decrypt_helper')
const jwt = require('jsonwebtoken')

/*
@ method: post
@ desc: login of admin
@ access: public
*/
async function loginAdmin(req, res) {
	const email = req.body.email
	const password = req.body.password
	console.log(email)

	try {
		const admin = await Admin.findOne({
			email: email,
		})

		if (!admin) {
			return res.status(404).json({
				status: 'failure',
				message: 'No admin found with given credentials',
				data: {},
			})
		}

		const loggedInAdmin = { _id: admin._id }
		const accessToken = jwt.sign(loggedInAdmin, process.env.JWT_SECRET)

		if (password === admin.password) {
			const ad = admin.toObject()
			delete ad.password

			// console.log(delAgent)

			return res.status(200).json({
				status: 'success',
				message: 'Login Success',
				data: { admin: ad, accessToken },
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
@ desc: get all department for admin
@ access: private
*/

async function getAllDepartment(req, res) {
	try {
		// var departmentId = req.department._id
		// console.log('departmentId', departmentId)
		var allDepartments = await Department.find()
		// .populate('senderDetails')
		// .populate('receiverDetails')

		const resultingAllDepartments = []

		for (const department of allDepartments) {

			resultingAllDepartments.push(department)

		}

		// console.log(resultingAllDepartments)
		return res.status(200).json({
			status: 'success',
			message: 'Departments Fetched Successful',
			data: resultingAllDepartments.reverse(),
		})
	} catch (error) {
		console.log(error.message)
		return res.status(500).json({ message: 'Something went wrong !' })
	}
}


async function updateDepartmentProfile(req, res) {
	try {
		const admin = req.admin._id // this is the id of loggedin department who is currently making the entry of this courier to their department (can be initiator as well as middle ones)

		if (!admin) {
			return res.status(403).json({
				status: 'failure',
				message: 'Unauthorized',
				data: {},
			})
		}
		const departmentDetails = req.body.departmentDetails
		const department = await Department.findById(departmentDetails._id)

		if (!department) {
			return res.status(404).json({
				status: 'failure',
				message: 'department not found',
				data: {},
			})
		} else {
			// courier.departmentStatus[departmentId] = courierDetails.status
			await Department.findByIdAndUpdate(departmentDetails._id, {
				name: departmentDetails.name,
				location: departmentDetails.location,
				contactNumber: departmentDetails.contactNumber,
				contactEmail: departmentDetails.contactEmail,
				city: departmentDetails.city,
				state: departmentDetails.state,
				pinCode: departmentDetails.pinCode,
				

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


async function addDepartment(req, res) {
  try {
		// console.log(req)
    console.log(req.body.departmentDetails.registrationNumber)
    const departmentExist = await Department.findOne({
      registrationNumber: req.body.departmentDetails.registrationNumber,
    })
    if (departmentExist) {
      return res.status(400).json({
        status: 'failure',
        message: 'Department with given registration number already exists',
        data: {},
      })
    }
    if (!req.body.departmentDetails.password) {
      return res.status(400).json({
        status: 'failure',
        message: 'Invalid Password Input',
        data: {},
      })
    }
    const securePassword = await encryptPassword(req.body.departmentDetails.password)
    if (securePassword === null) {
      return res.status(500).json({
        status: 'failure',
        message: 'Password Encryption failed',
        data: {},
      })
    }
    const department = new Department({
      name: req.body.departmentDetails.name,
      location: req.body.departmentDetails.location,
      registrationNumber: req.body.departmentDetails.registrationNumber,
      contactEmail: req.body.departmentDetails.contactEmail,
      contactNumber: req.body.departmentDetails.contactNumber,
      password: securePassword,
      city: req.body.departmentDetails.city,
      state: req.body.departmentDetails.state,
      pinCode: req.body.departmentDetails.pinCode,
      country: req.body.departmentDetails.country,
	  accepted:req.body.departmentDetails.accepted,
	  refused: req.body.departmentDetails.refused,
	  dispatch: req.body.departmentDetails.dispatch,
    })

		console.log(req)
    const newDepartment = await department.save()

    // const loggedInDepartment = { _id: department._id }
    // const accessToken = jwt.sign(loggedInDepartment, process.env.JWT_SECRET)

    return res.status(201).json({
      status: 'success',
      message: 'Department added successfully',
      data: {  },
    }) // 201 => creation success
  } catch (error) {
    return res.status(400).json({ message: error.message }) // 400 => invalid user inputs
  }
}


/*
@ method: get
@ desc: get all delivery agent for admin
@ access: private
*/

async function getAllDeliveryAgent(req, res) {
	try {
		// var departmentId = req.department._id
		// console.log('departmentId', departmentId)
		var allDeliveryAgents = await DeliveryAgent.find()
		// .populate('senderDetails')
		// .populate('receiverDetails')

		const resultingAllDeliveryAgents = []

		for (const delAgent of allDeliveryAgents) {

			resultingAllDeliveryAgents.push(delAgent)

		}
		console.log(resultingAllDeliveryAgents)

		// console.log(resultingAllDepartments)
		return res.status(200).json({
			status: 'success',
			message: 'Departments Fetched Successful',
			data: resultingAllDeliveryAgents.reverse(),
		})
	} catch (error) {
		console.log(error.message)
		return res.status(500).json({ message: 'Something went wrong !' })
	}
}

async function updateDeliveryAgentProfile(req, res) {
	try {
		const admin = req.admin._id // this is the id of loggedin department who is currently making the entry of this courier to their department (can be initiator as well as middle ones)

		if (!admin) {
			return res.status(403).json({
				status: 'failure',
				message: 'Unauthorized',
				data: {},
			})
		}
		const deliveryAgentDetails = req.body.deliveryAgentDetails
		const deliveryAgent = await DeliveryAgent.findById(deliveryAgentDetails._id)

		if (!deliveryAgent) {
			return res.status(404).json({
				status: 'failure',
				message: 'deliveryAgent not found',
				data: {},
			})
		} else {
			// courier.departmentStatus[departmentId] = courierDetails.status
			await DeliveryAgent.findByIdAndUpdate(deliveryAgentDetails._id, {
				name: deliveryAgentDetails.name,
				location: deliveryAgentDetails.location,
				contactNumber: deliveryAgentDetails.contactNumber,
				contactEmail: deliveryAgentDetails.contactEmail,
				city: deliveryAgentDetails.city,
				state: deliveryAgentDetails.state,
				pinCode: deliveryAgentDetails.pinCode,

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


async function addDeliveryAgent(req, res) {
  try {
		// console.log(req)
    console.log(req.body.deliveryAgentDetails.registrationNumber)
    const deliveryAgentExist = await DeliveryAgent.findOne({
      registrationNumber: req.body.deliveryAgentDetails.registrationNumber,
    })
    if (deliveryAgentExist) {
      return res.status(400).json({
        status: 'failure',
        message: 'Warehouse with given registration number already exists',
        data: {},
      })
    }
    if (!req.body.deliveryAgentDetails.password) {
      return res.status(400).json({
        status: 'failure',
        message: 'Invalid Password Input',
        data: {},
      })
    }
    const securePassword = await encryptPassword(req.body.deliveryAgentDetails.password)
    if (securePassword === null) {
      return res.status(500).json({
        status: 'failure',
        message: 'Password Encryption failed',
        data: {},
      })
    }
    const deliveryAgent = new DeliveryAgent({
      name: req.body.deliveryAgentDetails.name,
      location: req.body.deliveryAgentDetails.location,
      registrationNumber: req.body.deliveryAgentDetails.registrationNumber,
      email: req.body.deliveryAgentDetails.email,
      phoneNumber: req.body.deliveryAgentDetails.phoneNumber,
      password: securePassword,
      city: req.body.deliveryAgentDetails.city,
      state: req.body.deliveryAgentDetails.state,
      pinCode: req.body.deliveryAgentDetails.pinCode,
      country: req.body.deliveryAgentDetails.country,
    })

		// console.log(req)
    const newDeliveryAgent = await deliveryAgent.save()

    // const loggedInDepartment = { _id: department._id }
    // const accessToken = jwt.sign(loggedInDepartment, process.env.JWT_SECRET)

    return res.status(201).json({
      status: 'success',
      message: 'Department added successfully',
      data: {  },
    }) // 201 => creation success
  } catch (error) {
    return res.status(400).json({ message: error.message }) // 400 => invalid user inputs
  }
}


module.exports = {
	loginAdmin,
	getAllDepartment,
	updateDepartmentProfile,
	addDepartment,
	getAllDeliveryAgent,
	updateDeliveryAgentProfile,
	addDeliveryAgent,
}