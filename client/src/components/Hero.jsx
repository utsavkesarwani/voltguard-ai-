import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, Shield, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

// Abstract electric circuit SVG illustration
const ElectricIllustration = () => (
  <svg viewBox="0 0 520 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Background circles */}
    <circle cx="260" cy="210" r="190" fill="url(#radialGlow)" opacity="0.4" />
    <circle cx="260" cy="210" r="130" fill="url(#radialInner)" opacity="0.5" />

    {/* Main panel */}
    <rect x="120" y="80" width="280" height="260" rx="20" fill="white"
      stroke="#E5E7EB" strokeWidth="1.5"
      style={{ filter: 'drop-shadow(0 20px 60px rgba(37,99,235,0.12))' }} />

    {/* Panel header */}
    <rect x="120" y="80" width="280" height="60" rx="20" fill="url(#headerGrad)" />
    <rect x="120" y="120" width="280" height="20" fill="url(#headerGrad)" />

    {/* Header text lines */}
    <rect x="148" y="100" width="100" height="10" rx="5" fill="white" opacity="0.9" />
    <rect x="148" y="116" width="60" height="6" rx="3" fill="white" opacity="0.5" />

    {/* Status indicator */}
    <circle cx="370" cy="108" r="8" fill="#22C55E" />
    <circle cx="370" cy="108" r="5" fill="white" opacity="0.8" />

    {/* Circuit lines */}
    <path d="M148 180 H200 V160 H280 V180 H340" stroke="#E5E7EB" strokeWidth="2" />
    <path d="M148 210 H340" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="6 4" />
    <path d="M148 240 H180 V260 H220 V240 H260 V260 H300 V240 H340" stroke="#E5E7EB" strokeWidth="2" />

    {/* Breaker boxes */}
    {[180, 220, 260, 300, 340].map((x, i) => (
      <rect key={i} x={x - 14} y="170" width="28" height="20" rx="5"
        fill={i === 2 ? '#FEF2F2' : '#F0FDF4'}
        stroke={i === 2 ? '#EF4444' : '#22C55E'}
        strokeWidth="1.5" />
    ))}
    {/* Fault indicator on middle breaker */}
    <text x="246" y="184" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#EF4444">!</text>

    {/* Wiring diagram at bottom */}
    <rect x="148" y="280" width="70" height="42" rx="8" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" />
    <rect x="228" y="280" width="70" height="42" rx="8" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="1.5" />
    <rect x="308" y="280" width="70" height="42" rx="8" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="1.5" />
    <text x="183" y="306" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563EB">20A</text>
    <text x="263" y="306" textAnchor="middle" fontSize="9" fontWeight="600" fill="#22C55E">15A</text>
    <text x="343" y="306" textAnchor="middle" fontSize="9" fontWeight="600" fill="#F59E0B">30A</text>

    {/* Floating AI badge */}
    <g style={{ filter: 'drop-shadow(0 8px 24px rgba(37,99,235,0.25))' }}>
      <rect x="340" y="50" width="130" height="52" rx="14" fill="url(#aiGrad)" />
      <text x="365" y="74" fontSize="9" fontWeight="700" fill="white" opacity="0.8">AI ANALYSIS</text>
      <text x="365" y="91" fontSize="11" fontWeight="700" fill="white">87% Confidence</text>
      <circle cx="352" cy="76" r="8" fill="white" opacity="0.2" />
      <text x="352" y="80" textAnchor="middle" fontSize="8" fill="white">⚡</text>
    </g>

    {/* Floating risk badge */}
    <g style={{ filter: 'drop-shadow(0 8px 24px rgba(239,68,68,0.25))' }}>
      <rect x="40" y="160" width="110" height="52" rx="14" fill="white"
        stroke="#FECACA" strokeWidth="1.5" />
      <rect x="52" y="172" width="86" height="8" rx="4" fill="#FEE2E2" />
      <rect x="52" y="186" width="60" height="8" rx="4" fill="#EF4444" />
      <text x="97" y="205" fontSize="8" fontWeight="600" fill="#B91C1C" textAnchor="middle">FAULT DETECTED</text>
    </g>

    {/* Floating safe badge */}
    <g style={{ filter: 'drop-shadow(0 8px 24px rgba(34,197,94,0.25))' }}>
      <rect x="40" y="270" width="110" height="52" rx="14" fill="white"
        stroke="#BBF7D0" strokeWidth="1.5" />
      <text x="97" y="295" fontSize="8" fontWeight="700" fill="#15803D" textAnchor="middle">HEALTH SCORE</text>
      <text x="97" y="314" fontSize="18" fontWeight="800" fill="#22C55E" textAnchor="middle">62/100</text>
    </g>

    <defs>
      <radialGradient id="radialGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="radialInner" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="headerGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      <linearGradient id="aiGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
  </svg>
);

const Hero = () => {
  const stats = [
    { icon: Shield, value: '99.2%', label: 'Detection Accuracy' },
    { icon: Zap, value: '<3s', label: 'Analysis Time' },
    { icon: CheckCircle, value: '50K+', label: 'Faults Detected' },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: 'var(--gradient-hero)' }}
      id="hero"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-label mb-6 inline-flex">
                <Zap className="w-3 h-3" />
                AI-Powered Electrical Safety
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
              style={{ color: 'var(--color-heading)' }}
            >
              Detect Electrical Faults{' '}
              <span className="gradient-text">Before They</span>{' '}
              Become Dangerous.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg mb-8 leading-relaxed"
              style={{ color: 'var(--color-text)', maxWidth: '480px' }}
            >
              Upload an image of your electrical issue and receive AI-powered fault detection,
              safety recommendations, risk analysis and estimated repair cost in seconds.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link to="/detect" id="hero-cta-primary" className="btn btn-primary btn-lg">
                Analyze Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#how-it-works"
                id="hero-cta-secondary"
                className="btn btn-secondary btn-lg"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'var(--color-primary-light)',
                      border: '1px solid rgba(37,99,235,0.15)',
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div>
                    <div className="font-bold text-lg leading-tight" style={{ color: 'var(--color-heading)' }}>
                      {value}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--color-text)' }}>
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg mx-auto animate-float">
              <ElectricIllustration />
            </div>

            {/* Alert notification floating */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -bottom-4 right-0 lg:right-4"
              style={{
                background: 'white',
                border: '1px solid #FECACA',
                borderRadius: '16px',
                padding: '12px 16px',
                boxShadow: '0 10px 40px rgba(239,68,68,0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: '#FEF2F2' }}
              >
                <AlertTriangle className="w-4 h-4" style={{ color: '#EF4444' }} />
              </div>
              <div>
                <div className="text-xs font-semibold" style={{ color: '#111827' }}>
                  Fault Detected
                </div>
                <div className="text-xs" style={{ color: '#6B7280' }}>
                  Overloaded circuit — Medium risk
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
