import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  color = '#2563EB',
  bgColor = '#EFF6FF',
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="card p-6 cursor-default flex flex-col justify-between"
      style={{ borderRadius: '24px' }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
        style={{
          background: bgColor,
          border: `1px solid ${color}22`,
        }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>

      <h3
        className="font-semibold text-base mb-2 leading-snug"
        style={{ color: 'var(--color-heading)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
