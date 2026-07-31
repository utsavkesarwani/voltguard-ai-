const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { analyzeImage } = require('../controllers/analyzeController');
const rateLimit = require('express-rate-limit');

// Rate limit: max 10 analyze requests per 15 minutes per IP
const analyzeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    data: null,
    error: 'Too many analysis requests. Please wait 15 minutes before trying again.',
  },
});

router.post('/', analyzeLimiter, upload.single('image'), analyzeImage);

module.exports = router;
