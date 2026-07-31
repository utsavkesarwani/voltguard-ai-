const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/responseFormatter');
const reportService = require('../services/reportService');
const mongoose = require('mongoose');

/**
 * POST /api/analyze
 * Accepts an uploaded image, runs AI analysis, saves to DB, returns the report.
 */
const analyzeImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return sendError(res, 'No image file provided. Please upload a JPG or PNG image.', 400);
  }

  const imagePath = req.file.filename;

  // Analyze image with Gemini Vision AI
  const analysisData = await reportService.analyzeImage(imagePath);
  const report = await reportService.saveReport(imagePath, analysisData);

  return sendSuccess(res, report, 201);
});

module.exports = { analyzeImage };
