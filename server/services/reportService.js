const Report = require('../models/Report');

const MOCK_REPORT = {
  faultName: 'Overloaded Circuit Breaker',
  confidence: 87,
  riskLevel: 'medium',
  healthScore: 62,
  possibleCause:
    'Multiple high-load appliances on the same circuit are drawing more current than the breaker is rated for (15A). Visible heat discoloration on the breaker panel indicates prolonged overload.',
  recommendation:
    'Immediately reduce the load on this circuit by redistributing appliances. Have a licensed electrician inspect the panel and consider upgrading to a 20A circuit or adding a dedicated circuit for high-load devices.',
  estimatedCost: '$150 – $400 (circuit upgrade)',
  safetyTips: [
    'Do not reset a tripped breaker repeatedly — it signals a real overload.',
    'Unplug high-wattage devices (space heaters, microwaves) from this circuit.',
    'Never replace a breaker with a higher-rated one without professional assessment.',
    'Keep the breaker panel area clear of obstructions.',
  ],
};

/**
 * Analyze an uploaded electrical image and return fault analysis.
 * TODO: Replace mock response with Gemini Vision call in Phase 5.
 */
const analyzeImage = async (imagePath) => {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return { ...MOCK_REPORT };
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
