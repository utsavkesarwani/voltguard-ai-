import React from 'react';
import { motion } from 'framer-motion';

const Timeline = ({ steps }) => {
  return (
    <div className="relative">
      {/* Connecting line */}
      <div
        className="hidden lg:block absolute top-8 left-0 right-0 h-0.5"
        style={{
          background: 'linear-gradient(90deg, var(--color-border) 0%, var(--color-primary) 50%, var(--color-border) 100%)',
          top: '2.5rem',
          left: '8%',
          right: '8%',
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="flex flex-col items-center text-center"
          >
            {/* Step circle */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-5 text-2xl"
              style={{
                background: index === steps.length - 1
                  ? 'var(--gradient-primary)'
                  : 'var(--color-surface)',
                border: `2px solid ${index === steps.length - 1 ? 'transparent' : 'var(--color-border)'}`,
                boxShadow: index === steps.length - 1
                  ? '0 8px 25px rgba(37,99,235,0.35)'
                  : 'var(--shadow-md)',
              }}
            >
              {step.icon}
              {/* Step number */}
              <div
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: 'var(--gradient-primary)',
                  color: 'white',
                }}
              >
                {index + 1}
              </div>
            </motion.div>

            <h3
              className="font-semibold text-base mb-2"
              style={{ color: 'var(--color-heading)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
