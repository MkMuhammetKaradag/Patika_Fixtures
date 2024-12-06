const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const Course = require('../models/Furniture');
const User = require('../models/User');

require('dotenv').config();
exports.getİndexPge = async (req, res) => {
  const course = await Course.find().sort('-createdAt').limit(2);
  const totalCourses = await Course.find().countDocuments();
  const totalStudents = await User.countDocuments({ role: 'student' });
  const totalTeachers = await User.countDocuments({ role: 'teacher' });

  res.status(200).render('index', {
    Page_Name: 'index',
    course,
    totalCourses,
    totalStudents,
    totalTeachers,
  });
};
exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    Page_Name: 'about',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    Page_Name: 'register',
  });
};
exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    Page_Name: 'login',
  });
};
exports.getGalleryPage = (req, res) => {
  res.status(200).render('gallery', {
    Page_Name: 'gallery',
  });
};
exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    Page_Name: 'contact',
  });
};
exports.getFurnituresPage = (req, res) => {
  res.status(200).render('furnitures', {
    Page_Name: 'furnitures',
  });
};
