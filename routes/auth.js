const express = require('express')
const router = express.Router()
const { sendOtp, register, login, verifyOtp, resetPassword } = require('../controllers/auth')

router.post('/sendOtp', sendOtp)
router.post('/verifyOtp', verifyOtp);
router.post('/register', register)
router.post('/login', login)
router.patch('/resetPassword', resetPassword);

module.exports = router
