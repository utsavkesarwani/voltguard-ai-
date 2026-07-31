const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    faultName: {
      type: String,
      required: true,
      trim: true,
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    riskLevel: {
      type: String,
      required: true,
      enum: ['safe', 'low', 'medium', 'critical'],
      lowercase: true,
    },
    healthScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    possibleCause: {
      type: String,
      required: true,
    },
    recommendation: {
      type: String,
      required: true,
    },
    estimatedCost: {
      type: String,
      required: true,
    },
    safetyTips: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for fast dashboard queries
reportSchema.index({ createdAt: -1 });
reportSchema.index({ riskLevel: 1 });
reportSchema.index({ faultName: 'text' });

// Virtual for short display date
reportSchema.virtual('displayDate').get(function () {
  return this.createdAt
    ? this.createdAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;
});

reportSchema.set('toJSON', { virtuals: true });
reportSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Report', reportSchema);
