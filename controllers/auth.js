const User = require('../models/User')
const Otp = require('../models/Otp');
const nodemailer = require('nodemailer');
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors')

const sendOtp = async (req, res) => {

  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await Otp.deleteMany({ email });
  await Otp.create({ email, otp, expiresAt });

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'pearline.stokes27@ethereal.email',
      pass: '7hw7Wk1zKBWYDXBBQ6'
    }
  });

  const mailOptions = {
    from: 'pearline.stokes27@ethereal.email',
    to: email,
    subject: 'OTP Verification',
    html: `<p>Your OTP code is <b>${otp}</b>. Enter OTP in the app to verify. OTP <b>Expires in 10 min</b></p>`,
  };

  await transporter.sendMail(mailOptions);

  res.status(StatusCodes.OK).json({ message: `OTP sent to ${email}`, otp: otp });  //sending otp just for testing purpose
}

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body

  if (!otp) {
    throw new BadRequestError('Please provide OTP');
  }

  const otpRecord = await Otp.findOne({ email, otp });

  if (!otpRecord) {
    throw new NotFoundError('OTP not found or has expired');
  }

  if (otpRecord.expiresAt < Date.now()) {
    await Otp.deleteOne({ email, otp });
    throw new BadRequestError('OTP has expired');
  }

  res.status(StatusCodes.OK).json({ otpVerify: true });
};

const register = async (req, res) => {

  const { name, email, password, otpVerify } = req.body

  if (!otpVerify) {
    throw new BadRequestError('OTP is not verifies')
  }

  const user = await User.create({ name, email, password })

  const token = user.createJWT()

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });

};

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

const resetPassword = async (req, res) => {
  const { email, newPassword, otpVerify } = req.body;

  if (!otpVerify) {
    throw new BadRequestError('OTP is not verifies')
  }

  if (!email || !newPassword) {
    throw new BadRequestError('Please provide email and new password');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  user.password = newPassword;
  await user.save();

  await Otp.deleteMany({ email });

  res.status(StatusCodes.OK).json({ message: 'Password has been reset successfully' });
};


module.exports = {
  sendOtp,
  register,
  login,
  verifyOtp,
  resetPassword,
}
