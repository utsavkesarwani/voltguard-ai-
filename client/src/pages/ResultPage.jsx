import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle, CheckCircle, DollarSign, Info, Download,
  Upload, ArrowLeft, Shield, Zap
} from 'lucide-react';
import Badge from '../components/Badge';

// Mock report data
const MOCK_REPORT = {
  id: 'mock-result-001',
  faultName: 'Overloaded Circuit Breaker',
  confidence: 87,
  riskLevel: 'medium',
  healthScore: 62,
  possibleCause:
    'Multiple high-load appliances on the same circuit are drawing more current than the 15A breaker is rated for. Visible heat discoloration indicates prolonged overload.',
  recommendation:
    'Immediately reduce the load on this circuit by redistributing appliances. Have a licensed electrician inspect the panel and consider upgrading to a 20A circuit.',
  estimatedCost: '$150 – $400',
  safetyTips: [
    'Do not reset a tripped breaker repeatedly — it signals a real overload.',
    'Unplug high-wattage devices (space heaters, microwaves) from this circuit.',
    'Never replace a breaker with a higher-rated one without professional assessment.',
    'Keep the breaker panel area clear of obstructions.',
  ],
  createdAt: new Date().toISOString(),
};

const riskColors = {
  safe: { color: '#15803D', bg: '#DCFCE7', border: '#BBF7D0', icon: CheckCircle },
  low: { color: '#92400E', bg: '#FEF9C3', border: '#FEF08A', icon: AlertTriangle },
  medium: { color: '#C2410C', bg: '#FFF7ED', border: '#FED7AA', icon: AlertTriangle },
  critical: { color: '#B91C1C', bg: '#FEF2F2', border: '#FECACA', icon: AlertTriangle },
};

const RiskMeterBar = ({ level }) => {
  const levels = ['safe', 'low', 'medium', 'critical'];
  const idx = levels.indexOf(level);
  const percent = ((idx + 1) / 4) * 100;
  const barColor = { safe: '#22C55E', low: '#F59E0B', medium: '#F97316', critical: '#EF4444' }[level];

  return (
    <div>
      <div className="flex justify-between text-xs mb-2" style={{ color: 'var(--color-text)' }}>
        <span style={{ color: '#22C55E', fontWeight: 600 }}>Safe</span>
        <span style={{ color: '#F59E0B', fontWeight: 600 }}>Low</span>
        <span style={{ color: '#F97316', fontWeight: 600 }}>Medium</span>
        <span style={{ color: '#EF4444', fontWeight: 600 }}>Critical</span>
      </div>
      <div
        className="h-3 rounded-full overflow-hidden"
        style={{ background: 'var(--color-border)' }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, #22C55E, ${barColor})` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        {levels.map((l, i) => (
          <div
            key={l}
            className="w-2 h-2 rounded-full mt-1"
            style={{
              background: i <= idx ? barColor : 'var(--color-border)',
              marginLeft: i === 0 ? '0' : 'auto',
              marginRight: i === levels.length - 1 ? '0' : 'auto',
            }}
          />
        ))}
      </div>
    </div>
  );
};

const ResultPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Use mock report for now (Phase 7 will use real API)
  const report = MOCK_REPORT;
  const risk = riskColors[report.riskLevel] || riskColors.medium;
  const RiskIcon = risk.icon;

  const fieldVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate('/detect')}
          className="flex items-center gap-2 mb-6 text-sm font-medium group"
          style={{ color: 'var(--color-text)' }}
          id="back-to-detect"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Analyze another image
        </motion.button>

        {/* Report Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl p-6 mb-5"
          style={{
            background: risk.bg,
            border: `1px solid ${risk.border}`,
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${risk.color}18` }}
              >
                <RiskIcon className="w-6 h-6" style={{ color: risk.color }} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: risk.color }}>
                  Fault Detected
                </p>
                <h1 className="text-xl font-bold" style={{ color: 'var(--color-heading)' }}>
                  {report.faultName}
                </h1>
              </div>
            </div>
            <Badge variant={report.riskLevel} size="md">
              {report.riskLevel.charAt(0).toUpperCase() + report.riskLevel.slice(1)} Risk
            </Badge>
          </div>
        </motion.div>

        {/* Main Result Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card p-7 mb-5"
          style={{ borderRadius: '24px' }}
        >
          {/* Confidence + Health Score */}
          <div className="grid grid-cols-2 gap-4 mb-7">
            <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
              <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-light)' }}>
                Confidence
              </p>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold gradient-text">{report.confidence}%</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${report.confidence}%` }}
                  transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: 'var(--gradient-primary)' }}
                />
              </div>
            </motion.div>
            <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
              <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-light)' }}>
                Health Score
              </p>
              <div className="flex items-end gap-1">
                <span
                  className="text-3xl font-bold"
                  style={{
                    color: report.healthScore >= 70 ? '#22C55E' : report.healthScore >= 40 ? '#F59E0B' : '#EF4444',
                  }}
                >
                  {report.healthScore}
                </span>
                <span className="text-sm mb-1" style={{ color: 'var(--color-text)' }}>/100</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${report.healthScore}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: report.healthScore >= 70 ? '#22C55E' : report.healthScore >= 40 ? '#F59E0B' : '#EF4444',
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Risk Meter */}
          <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible" className="mb-7">
            <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-light)' }}>
              Risk Level
            </p>
            <RiskMeterBar level={report.riskLevel} />
          </motion.div>

          {/* Possible Cause */}
          <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible"
            className="p-4 rounded-2xl mb-4"
            style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text)' }}>
                Possible Cause
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-heading)' }}>
              {report.possibleCause}
            </p>
          </motion.div>

          {/* Recommendation */}
          <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible"
            className="p-4 rounded-2xl mb-4"
            style={{ background: '#EFF6FF', border: '1px solid rgba(37,99,235,0.15)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-primary)' }}>
                Recommendation
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-heading)' }}>
              {report.recommendation}
            </p>
          </motion.div>

          {/* Estimated Cost */}
          <motion.div custom={5} variants={fieldVariants} initial="hidden" animate="visible"
            className="p-4 rounded-2xl mb-4"
            style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}
          >
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4" style={{ color: '#F59E0B' }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#92400E' }}>
                Estimated Repair Cost
              </span>
            </div>
            <p className="text-xl font-bold" style={{ color: '#92400E' }}>
              {report.estimatedCost}
            </p>
          </motion.div>

          {/* Safety Tips */}
          <motion.div custom={6} variants={fieldVariants} initial="hidden" animate="visible">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text)' }}>
              Safety Tips
            </p>
            <ul className="space-y-2">
              {report.safetyTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#22C55E' }} />
                  <span className="text-sm" style={{ color: 'var(--color-heading)' }}>{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-3"
        >
          <button
            className="btn btn-primary flex-1"
            id="download-report"
            onClick={() => alert('PDF report download coming soon!')}
          >
            <Download className="w-4 h-4" />
            Download Report
          </button>
          <Link
            to="/detect"
            className="btn btn-secondary flex-1"
            id="upload-another"
          >
            <Upload className="w-4 h-4" />
            Analyze Another
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultPage;
