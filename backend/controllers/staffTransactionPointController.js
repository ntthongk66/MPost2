const StaffTransactionPoint = require('../models/staffTransactionPointModel')

const {
    encryptPassword,
    decryptPassword,
} = require('../utils/password_encrypt_decrypt_helper')
const jwt = require('jsonwebtoken')

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