const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/responseFormatter');
const reportService = require('../services/reportService');
const mongoose = require('mongoose');

/**
 * GET /api/history
 * Returns paginated list of reports with search and filter support.
 */
const getHistory = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = '', riskLevel = '' } = req.query;
  const result = await reportService.getReports({ page, limit, search, riskLevel });
  return sendSuccess(res, result);
});

/**
 * GET /api/report/:id
 * Returns a single report by ID.
 */
const getReport = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendError(res, 'Invalid report ID format.', 400);
  }

  const report = await reportService.getReportById(id);
  if (!report) {
    return sendError(res, 'Report not found.', 404);
  }

  return sendSuccess(res, report);
});

/**
 * GET /api/stats
 * Returns dashboard aggregate statistics.
 */
const getStats = asyncHandler(async (req, res) => {
  const stats = await reportService.getStats();
  return sendSuccess(res, stats);
});

module.exports = { getHistory, getReport, getStats };
