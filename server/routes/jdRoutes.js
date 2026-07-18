const express = require('express');
const router = express.Router();
const { getJDs, getJDById, createJD, deleteJD } = require('../controllers/jdController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getJDs)
  .post(protect, createJD);

router.route('/:id')
  .get(protect, getJDById)
  .delete(protect, deleteJD);

module.exports = router;
