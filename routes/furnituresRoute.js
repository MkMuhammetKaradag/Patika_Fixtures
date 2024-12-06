const express = require('express');
const furnituresController = require('../controllers/furnituresController');
const roleMiddlewears = require('../Middlewares/roleMiddlewears');
const authMiddlewares = require('../Middlewares/authMidlewares');
const router = express.Router();

router
  .route('/')
  .post(
    authMiddlewares,
    roleMiddlewears(['admin']),
    furnituresController.createCourse
  );
router.route('/').get(furnituresController.getAllCourse);
router.route('/:slug').get(furnituresController.getCourse);
router.route('/:slug').delete(furnituresController.deleteCourse);
router.route('/:slug').put(furnituresController.updateCourse);
router.route('/enroll').post(furnituresController.EnrollCourse);
router.route('/release').post(furnituresController.releaseCourse);

module.exports = router;
