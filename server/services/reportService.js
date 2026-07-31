const Report = require('../models/Report');
const { analyzeWithGemini } = require('./geminiService');

/**
 * Analyze an uploaded electrical image using Gemini Vision AI.
 * Returns fault analysis in camelCase Report schema shape.
 */
const analyzeImage = async (imagePath) => {
  return await analyzeWithGemini(imagePath);
};

/**
 * Save analysis report to MongoDB.
 */
const saveReport = async (imagePath, analysisData) => {
  const report = new Report({
    image: imagePath,
    faultName: analysisData.faultName,
    confidence: analysisData.confidence,
    riskLevel: analysisData.riskLevel,
    healthScore: analysisData.healthScore,
    possibleCause: analysisData.possibleCause,
    recommendation: analysisData.recommendation,
    estimatedCost: analysisData.estimatedCost,
    safetyTips: analysisData.safetyTips || [],
  });

  return await report.save();
};

/**
 * Get paginated list of reports with optional search and filter.
 */
const getReports = async ({ page = 1, limit = 10, search = '', riskLevel = '' }) => {
  const query = {};

  if (search) {
    query.$text = { $search: search };
  }

  if (riskLevel && ['safe', 'low', 'medium', 'critical'].includes(riskLevel)) {
    query.riskLevel = riskLevel;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const totalCount = await Report.countDocuments(query);
  const reports = await Report.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  return {
    reports,
    totalCount,
    page: parseInt(page),
    totalPages: Math.ceil(totalCount / parseInt(limit)),
  };
};

/**
 * Get a single report by ID.
 */
const getReportById = async (id) => {
  return await Report.findById(id);
};

/**
 * Get dashboard aggregate statistics.
 */
const getStats = async () => {
  const stats = await Report.aggregate([
    {
      $group: {
        _id: '$riskLevel',
        count: { $sum: 1 },
      },
    },
  ]);

  const totalAnalyses = await Report.countDocuments();
  const statMap = { safe: 0, low: 0, medium: 0, critical: 0 };
  stats.forEach((s) => {
    statMap[s._id] = s.count;
  });

  return {
    totalAnalyses,
    ...statMap,
  };
};

module.exports = { analyzeImage, saveReport, getReports, getReportById, getStats };
