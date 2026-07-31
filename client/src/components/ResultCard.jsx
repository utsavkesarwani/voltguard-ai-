import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, Shield, DollarSign } from 'lucide-react';
import Badge from './Badge';

const riskMeta = {
  safe:     { color: '#15803D', bg: '#DCFCE7', border: '#BBF7D0', icon: CheckCircle },
  low:      { color: '#92400E', bg: '#FEF9C3', border: '#FEF08A', icon: AlertTriangle },
  medium:   { color: '#C2410C', bg: '#FFF7ED', border: '#FED7AA', icon: AlertTriangle },
  critical: { color: '#B91C1C', bg: '#FEF2F2', border: '#FECACA', icon: AlertTriangle },
};

/**
 * ResultCard — Premium fault analysis report card
 * Props: report (object matching the Report schema)
 *   { faultName, confidence, riskLevel, healthScore, possibleCause,
 *     recommendation, estimatedCost, safetyTips[] }
 */
const ResultCard = ({ report }) => {
  const risk = riskMeta[report?.riskLevel] || riskMeta.medium;
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
    <div>
      {/* ── Report Header Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl p-6 mb-5"
        style={{ background: risk.bg, border: `1px solid ${risk.border}` }}
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
                {report?.faultName || 'Unknown Fault'}
              </h1>
            </div>
          </div>
          <Badge variant={report?.riskLevel || 'medium'} size="md">
            {((report?.riskLevel || 'medium').charAt(0).toUpperCase() +
              (report?.riskLevel || 'medium').slice(1))} Risk
          </Badge>
        </div>
      </motion.div>

      {/* ── Main Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card p-6"
        style={{ borderRadius: '24px' }}
      >
        {/* Confidence + Health Score */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
            <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-light)' }}>
              Confidence
            </p>
            <div className="flex items-end gap-1">
              <span className="text-3xl font-bold gradient-text">{report?.confidence ?? 0}%</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${report?.confidence ?? 0}%` }}
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
                  color: (report?.healthScore ?? 0) >= 70
                    ? '#22C55E'
                    : (report?.healthScore ?? 0) >= 40
                    ? '#F59E0B'
                    : '#EF4444',
                }}
              >
                {report?.healthScore ?? 0}
              </span>
              <span className="text-sm mb-1" style={{ color: 'var(--color-text)' }}>/100</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${report?.healthScore ?? 0}%` }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{
                  background: (report?.healthScore ?? 0) >= 70
                    ? '#22C55E'
                    : (report?.healthScore ?? 0) >= 40
                    ? '#F59E0B'
                    : '#EF4444',
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Possible Cause */}
        <motion.div
          custom={3} variants={fieldVariants} initial="hidden" animate="visible"
          className="p-4 rounded-2xl mb-5"
          style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text)' }}>
              Possible Cause
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-heading)' }}>
            {report?.possibleCause || '—'}
          </p>
        </motion.div>

        {/* Recommendation */}
        <motion.div
          custom={4} variants={fieldVariants} initial="hidden" animate="visible"
          className="p-4 rounded-2xl mb-5"
          style={{ background: '#EFF6FF', border: '1px solid rgba(37,99,235,0.15)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-primary)' }}>
              Recommendation
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-heading)' }}>
            {report?.recommendation || '—'}
          </p>
        </motion.div>

        {/* Estimated Cost */}
        <motion.div
          custom={5} variants={fieldVariants} initial="hidden" animate="visible"
          className="p-4 rounded-2xl mb-5"
          style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4" style={{ color: '#F59E0B' }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#92400E' }}>
              Estimated Repair Cost
            </span>
          </div>
          <p className="text-xl font-bold" style={{ color: '#92400E' }}>
            {report?.estimatedCost || 'Contact an electrician for a quote'}
          </p>
        </motion.div>

        {/* Safety Tips */}
        {report?.safetyTips?.length > 0 && (
          <motion.div custom={6} variants={fieldVariants} initial="hidden" animate="visible">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text)' }}>
              Safety Tips
            </p>
            <ul className="space-y-2.5">
              {report.safetyTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#22C55E' }} />
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--color-heading)' }}>{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ResultCard;
