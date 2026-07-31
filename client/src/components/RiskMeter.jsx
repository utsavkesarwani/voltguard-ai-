import React from 'react';
import { motion } from 'framer-motion';

const LEVELS = ['safe', 'low', 'medium', 'critical'];
const LEVEL_COLORS = {
  safe:     '#22C55E',
  low:      '#F59E0B',
  medium:   '#F97316',
  critical: '#EF4444',
};
const LEVEL_LABELS = {
  safe:     'Safe',
  low:      'Low',
  medium:   'Medium',
  critical: 'Critical',
};

/**
 * RiskMeter — Animated horizontal risk level bar
 * Props: level ('safe' | 'low' | 'medium' | 'critical')
 *        showLabel (bool, default true)
 */
const RiskMeter = ({ level = 'medium', showLabel = true }) => {
  const idx = LEVELS.indexOf(level);
  const safeIdx = Math.max(0, idx);
  const percent = ((safeIdx + 1) / LEVELS.length) * 100;
  const barColor = LEVEL_COLORS[level] || LEVEL_COLORS.medium;
  const barGradient = `linear-gradient(90deg, #22C55E 0%, ${barColor} 100%)`;

  return (
    <div>
      {/* Zone labels */}
      <div className="flex justify-between text-xs mb-2.5 font-semibold">
        {LEVELS.map((l) => (
          <span
            key={l}
            style={{
              color: LEVEL_COLORS[l],
              opacity: l === level ? 1 : 0.5,
              fontWeight: l === level ? 700 : 500,
            }}
          >
            {LEVEL_LABELS[l]}
          </span>
        ))}
      </div>

      {/* Track */}
      <div
        className="h-3 rounded-full overflow-hidden relative"
        style={{ background: 'var(--color-border)' }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1.3, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
          className="h-full rounded-full"
          style={{ background: barGradient }}
        />
      </div>

      {/* Zone markers */}
      <div className="flex justify-between mt-1.5 px-0">
        {LEVELS.map((l, i) => (
          <motion.div
            key={l}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 + i * 0.08, type: 'spring', stiffness: 300 }}
            className="w-2 h-2 rounded-full"
            style={{
              background: i <= safeIdx ? barColor : 'var(--color-border)',
              // space evenly
              marginLeft: i === 0 ? '0' : 'auto',
              marginRight: i === LEVELS.length - 1 ? '0' : 'auto',
            }}
          />
        ))}
      </div>

      {/* Current level pill */}
      {showLabel && (
        <div className="mt-3 flex justify-center">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: `${barColor}18`,
              color: barColor,
              border: `1px solid ${barColor}44`,
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: barColor }}
            />
            {LEVEL_LABELS[level]} Risk
          </span>
        </div>
      )}
    </div>
  );
};

export default RiskMeter;
