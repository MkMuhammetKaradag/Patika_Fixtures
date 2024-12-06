const express = require('express');
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddlewares = require('../Middlewares/authMidlewares');
const User = require('../models/User');
const router = express.Router();

router.route('/signup').post(
  [
    body('name').notEmpty().withMessage('Please enter Your Name'),
    body('email')
      .isEmail()
      .withMessage('Please your Enter Valid Email')
      .custom(async (userEmail) => {
        const user = await User.findOne({ email: userEmail });
        if (user) {
          return Promise.reject('Email already exists');
        }
      }),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters long'),
  ],
  authController.createUser
);
router.route('/login').post(authController.LoginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authMiddlewares, authController.getDashboard);
router.route('/:id').delete(authController.deleteUser);

module.exports = router;
