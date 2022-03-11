import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAdmin, isAuth } from '../utils.js';
import Otp from '../models/otpModel.js';
import nodemailer from 'nodemailer';

const userRouter = express.Router();

userRouter.get(
  '/top-sellers',
  expressAsyncHandler(async (req, res) => {
    const topSellers = await User.find({ isSeller: true })
      .sort({ 'seller.rating': -1 })
      .limit(3);
    res.send(topSellers);
  })
);

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await User.deleteMany({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post('/send-email', async (req, res) => {
  // console.log(req.body.email);
  let data = await User.findOne({ email: req.body.email });
  // console.log(data);
  const responseType = {};

  if (data) {
    let otpCode = Math.floor(100000 + Math.random() * 900000); // generate 6 digits and the first digit will never be 0.
    let otpData = new Otp({
      email: req.body.email,
      code: otpCode,
      expireIn: new Date().getTime() + 300 * 1000, // 5 minutes from now
    });
    let otpResponse = await otpData.save();
    responseType.statusText = 'success';
    mailer(req.body.email, otpCode);
    responseType.message = 'please check your email';
  } else {
    responseType.statusText = 'failure';
    responseType.message = 'email does not exist';
  }
  res.status(200).json(responseType);
});

userRouter.post('/forgot-password', async (req, res) => {
  let { email, otp, password } = req.body;
  password = bcrypt.hashSync(password, 8);
  // console.log(email, otp, password, confirmPassword);
  let data = await Otp.find({
    email: email,
    code: otp,
  });
  console.log(data);
  const responseType = {};

  if (data.length > 0) {
    let currentTime = new Date().getTime();
    let diffTime = data.expireIn - currentTime;
    if (diffTime < 0) {
      responseType.statusText = 'otp-expired';
      responseType.message = 'OTP expired';
    } else {
      let user = await User.findOne({ email: email });
      user.password = password;
      user.save();
      responseType.statusText = 'success';
      responseType.message = 'password changed successfully';
    }
  } else {
    responseType.statusText = 'otp-failed';
    responseType.message = 'invalid OTP';
  }
  res.status(200).json(responseType);
});

const mailer = (email, otp) => {
  /**
  * https://stackoverflow.com/questions/45478293/
    username-and-password-not-accepted-when-using-nodemailer
  */

  /**
   * https://myaccount.google.com/lesssecureapps
   */

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
      user: 'n.mahara2003@gmail.com',
      pass: 'NirajanMahara@9868519098',
    },
  });

  const mailOptions = {
    from: 'n.mahara2003@gmail.com',
    to: email,
    subject: 'OTP Email using Node.js',
    html:
      '<h3>OTP for account verification is </h3>' +
      "<h1 style='font-weight:bold;'>" +
      otp +
      '</h1>',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isSeller: user.isSeller,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      isSeller: user.isSeller,
      token: generateToken(createdUser),
    });
  })
);

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (user.isSeller) {
        user.seller.name = req.body.sellerName || user.seller.name;
        user.seller.logo = req.body.sellerLogo || user.seller.logo;
        user.seller.description =
          req.body.sellerDescription || user.seller.description;
      }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(updatedUser),
      });
    }
  })
);

userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'admin@example.com') {
        res.status(400).send({ message: 'Can Not Delete Admin User' });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: 'User Deleted', user: deleteUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isSeller = req.body.isSeller || user.isSeller;
      user.isAdmin = req.body.isAdmin || user.isAdmin;
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

export default userRouter;
