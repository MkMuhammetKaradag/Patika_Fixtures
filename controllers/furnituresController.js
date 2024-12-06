const Course = require('../models/Furniture');
const User = require('../models/User');
const Category = require('../models/Category');
const fs = require('fs');
exports.createCourse = async (req, res) => {
  try {
    console.log('geldi');
    const uploadDir = 'public/uploads';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    let uploadeImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name;
    console.log('asdas', uploadeImage);
    uploadeImage.mv(uploadPath, async () => {
      const course = await Course.create({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        user: req.session.userID,
        image: '/uploads/' + uploadeImage.name,
      });
      req.flash('success', `${course.name} has been create succesfully`);
      res.status(201).redirect('/furnitures');
    });
  } catch (error) {
    console.log(error);
    req.flash('error', 'something happened');
    res.status(400).redirect('/furnitures');
  }
};
exports.getAllCourse = async (req, res) => {
  try {
    const categoryslug = req.query.categories;
    console.log(categoryslug);
    const category = await Category.findOne({ slug: categoryslug });

    let filter = {};
    if (categoryslug) {
      filter = { category: category._id };
    }
    const query = req.query.search;
    if (query) {
      filter = { name: query };
    }

    if (!query && !categoryslug) {
      (filter.name = ''), (filter.category = null);
    }

    const furnitures = await Course.find({
      $or: [
        { name: { $regex: '.*' + filter.name + '.*', $options: 'i' } },
        { category: filter.category },
      ],
    })
      .sort('-createdAt')
      .populate('user');

    const categories = await Category.find();
    res.status(200).render('furnitures', {
      furnitures: furnitures,
      categories,
      Page_Name: 'furnitures',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    console.log(user);
    const furniture = await Course.findOne({ slug: req.params.slug }).populate(
      'user'
    );
    const categories = await Category.find();
    res.status(200).render('furniture', {
      furniture,
      categories,
      user,
      Page_Name: 'furniture',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.EnrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.furnitures.push({ _id: req.body.course_id });
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.furnitures.pull({ _id: req.body.course_id });
    await user.save();
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({ slug: req.params.slug });
    await User.updateMany(
      { courses: course._id },
      { $pull: { courses: course._id } }
    );
    req.flash('error', `${course.name} has been removed succesfully`);
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { slug: req.params.slug },
      req.body
    );
    course.save();
    req.flash('success', `${course.name} has been updated succesfully`);
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    req.flash('error', 'something happened');

    res.status(400).redirect('/users/dashboard');
  }
};
