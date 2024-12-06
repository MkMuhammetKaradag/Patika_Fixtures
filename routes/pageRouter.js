const express = require('express');
const pageController = require('../controllers/pageController');
const redirectMiddlewears = require('../Middlewares/redirectMiddlewears');

const router = express.Router();

router.route('/').get(pageController.getİndexPge);
router.route('/about').get(pageController.getAboutPage);
router
  .route('/register')
  .get(redirectMiddlewears, pageController.getRegisterPage);
router.route('/login').get(redirectMiddlewears, pageController.getLoginPage);
// router.route('/furnitures').get(pageController.getFurnituresPage);
router.route('/gallery').get(pageController.getGalleryPage);
router.route('/contact').get(pageController.getContactPage);

module.exports = router;
