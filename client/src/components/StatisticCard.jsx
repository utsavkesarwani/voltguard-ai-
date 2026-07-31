import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * StatisticCard — Dashboard KPI tile
 * Props: icon (LucideIcon), label (string), value (string|number),
 *        color (hex), bgColor (hex), trend (string, optional),
 *        trendUp (bool, optional), index (number, for stagger)
 */
const StatisticCard = ({
  icon: Icon,
  label,
  value,
  color = '#2563EB',
  bgColor = '#EFF6FF',
  trend,
  trendUp,
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      className="card p-5 flex flex-col gap-3"
      style={{ borderRadius: '20px' }}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: bgColor, border: `1px solid ${color}22` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>

      {/* Value */}
      <div
        className="text-3xl font-bold leading-none"
        style={{ color: 'var(--color-heading)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {value}
      </div>

      {/* Label + Trend */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm" style={{ color: 'var(--color-text)' }}>
          {label}
        </span>
        {trend && (
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              color: trendUp ? '#15803D' : '#B91C1C',
              background: trendUp ? '#DCFCE7' : '#FEE2E2',
            }}
          >
            {trendUp ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {trend}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default StatisticCard;
