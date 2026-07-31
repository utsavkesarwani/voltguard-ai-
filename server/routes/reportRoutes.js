const express = require('express');
const router = express.Router();
const { getHistory, getReport, getStats } = require('../controllers/reportController');

router.get('/history', getHistory);
router.get('/stats', getStats);
router.get('/report/:id', getReport);

module.exports = router;
