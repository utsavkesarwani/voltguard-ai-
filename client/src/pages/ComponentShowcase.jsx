import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, AlertOctagon, CheckCircle, TrendingUp, Zap,
} from 'lucide-react';

// ── Components under review
import Badge from '../components/Badge';
import StatisticCard from '../components/StatisticCard';
import Loader from '../components/Loader';
import Skeleton from '../components/Skeleton';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';
import UploadArea from '../components/UploadArea';
import ResultCard from '../components/ResultCard';
import RiskMeter from '../components/RiskMeter';

// ── Sample data ──────────────────────────────────────────────────────────────

const SAMPLE_REPORT = {
  faultName: 'Overloaded Circuit Breaker',
  confidence: 87,
  riskLevel: 'medium',
  healthScore: 62,
  possibleCause:
    'Multiple high-load appliances on the same circuit are drawing more current than the 15A breaker is rated for. Visible heat discoloration indicates prolonged overload.',
  recommendation:
    'Immediately reduce the load on this circuit by redistributing appliances. Have a licensed electrician inspect the panel.',
  estimatedCost: '$150 – $400',
  safetyTips: [
    'Do not reset a tripped breaker repeatedly — it signals a real overload.',
    'Unplug high-wattage devices from this circuit.',
    'Never replace a breaker with a higher-rated one without professional assessment.',
  ],
};

const STAT_CARDS = [
  { icon: BarChart3,    label: 'Total Analyses', value: 52,  color: '#2563EB', bgColor: '#EFF6FF', trend: '+12%', trendUp: true },
  { icon: AlertOctagon, label: 'Critical Faults', value: 8,   color: '#EF4444', bgColor: '#FEF2F2', trend: '+2',   trendUp: false },
  { icon: TrendingUp,   label: 'Medium Risk',     value: 14,  color: '#F97316', bgColor: '#FFF7ED', trend: '+3',   trendUp: false },
  { icon: CheckCircle,  label: 'Safe',            value: 30,  color: '#22C55E', bgColor: '#F0FDF4', trend: '+7',   trendUp: true },
];

// ── Section wrapper
const Section = ({ title, description, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="mb-16"
  >
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--color-heading)' }}>
        {title}
      </h2>
      {description && (
        <p className="text-sm" style={{ color: 'var(--color-text)' }}>{description}</p>
      )}
    </div>
    {children}
  </motion.section>
);

// ── Main showcase page ────────────────────────────────────────────────────────

const ComponentShowcase = () => {
  const toast = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleUploadFile = (f) => {
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(f.type)) {
      setUploadError('Please upload a JPG or PNG image.');
      return;
    }
    setUploadError(null);
    setUploadFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setUploadPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  const handleUploadClear = () => {
    setUploadFile(null);
    setUploadPreview(null);
    setUploadError(null);
  };

  return (
    <div className="min-h-screen py-14 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-4xl mx-auto">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', border: '1px solid rgba(37,99,235,0.15)' }}
          >
            <Zap className="w-4 h-4" />
            Phase 2 — Component Showcase
          </div>
          <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--color-heading)' }}>
            VoltGuard AI Component Library
          </h1>
          <p className="text-base" style={{ color: 'var(--color-text)' }}>
            Visual review of every reusable UI component with sample data.
            This route will be removed in Phase 7.
          </p>
        </motion.div>

        {/* ── 1. Badge ── */}
        <Section title="Badge" description="Risk level pills used across result cards and dashboard table.">
          <div className="flex flex-wrap gap-3">
            {['safe', 'low', 'medium', 'critical'].map((v) => (
              <Badge key={v} variant={v} size="md">
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </Badge>
            ))}
            <Badge variant="safe" size="sm">Safe (sm)</Badge>
            <Badge variant="critical" size="sm">Critical (sm)</Badge>
          </div>
        </Section>

        {/* ── 2. StatisticCard ── */}
        <Section title="StatisticCard" description="Dashboard KPI tiles with icon, value, label and optional trend indicator.">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STAT_CARDS.map((card, i) => (
              <StatisticCard key={card.label} {...card} index={i} />
            ))}
          </div>
        </Section>

        {/* ── 3. Loader ── */}
        <Section title="Loader" description="Branded loading spinner with message. Sizes: sm, md, lg.">
          <div className="grid grid-cols-3 gap-6">
            {['sm', 'md', 'lg'].map((size) => (
              <div
                key={size}
                className="card p-8 flex flex-col items-center gap-4"
                style={{ borderRadius: '20px' }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-light)' }}>
                  Size: {size}
                </p>
                <Loader message="Analyzing image…" size={size} />
              </div>
            ))}
          </div>
        </Section>

        {/* ── 4. Skeleton ── */}
        <Section title="Skeleton" description="Shimmer loading placeholders. Variants: statCard, resultCard, tableRow, text.">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-light)' }}>statCard</p>
              <div className="grid grid-cols-2 gap-3">
                <Skeleton variant="statCard" />
                <Skeleton variant="statCard" />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-light)' }}>text (5 lines)</p>
              <div className="card p-5" style={{ borderRadius: '16px' }}>
                <Skeleton variant="text" count={5} />
              </div>
            </div>
            <div className="col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-light)' }}>tableRow (3 rows)</p>
              <div className="card overflow-hidden" style={{ borderRadius: '16px' }}>
                <table className="w-full">
                  <tbody>
                    <Skeleton variant="tableRow" count={3} />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Section>

        {/* ── 5. RiskMeter ── */}
        <Section title="RiskMeter" description="Animated 4-zone risk meter. All four risk levels shown.">
          <div className="grid grid-cols-2 gap-6">
            {['safe', 'low', 'medium', 'critical'].map((level) => (
              <div key={level} className="card p-6" style={{ borderRadius: '20px' }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--color-text-light)' }}>
                  Level: {level}
                </p>
                <RiskMeter level={level} />
              </div>
            ))}
          </div>
        </Section>

        {/* ── 6. UploadArea ── */}
        <Section title="UploadArea" description="Drag-and-drop image upload zone with validation, preview and remove action.">
          <div className="max-w-lg mx-auto">
            <UploadArea
              file={uploadFile}
              preview={uploadPreview}
              error={uploadError}
              onFile={handleUploadFile}
              onClear={handleUploadClear}
            />
          </div>
        </Section>

        {/* ── 7. ResultCard ── */}
        <Section title="ResultCard" description="Full fault analysis report card with staggered field reveal.">
          <ResultCard report={SAMPLE_REPORT} />
        </Section>

        {/* ── 8. Modal ── */}
        <Section title="Modal" description="Accessible modal with backdrop blur, Escape key and outside-click to close.">
          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-primary"
            id="showcase-open-modal"
          >
            Open Modal
          </button>
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Sample Modal">
            <p className="text-sm mb-4" style={{ color: 'var(--color-text)' }}>
              This is a sample modal. Click outside, press Escape, or click ✕ to close.
              Useful for confirmation dialogs, image previews, and more.
            </p>
            <div className="flex gap-3">
              <button className="btn btn-primary flex-1" onClick={() => setModalOpen(false)}>
                Confirm
              </button>
              <button className="btn btn-secondary flex-1" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
            </div>
          </Modal>
        </Section>

        {/* ── 9. Toast ── */}
        <Section title="Toast" description="Slide-in toast notifications. Supports success, error, warning, info variants.">
          <div className="flex flex-wrap gap-3">
            {[
              { type: 'success', label: 'Success Toast', msg: 'Image analyzed successfully! Report saved.' },
              { type: 'error',   label: 'Error Toast',   msg: 'Analysis failed. Please try again with a clearer image.' },
              { type: 'warning', label: 'Warning Toast', msg: 'Large file detected. Analysis may take longer.' },
              { type: 'info',    label: 'Info Toast',    msg: 'Your image is processed securely and not stored permanently.' },
            ].map(({ type, label, msg }) => (
              <button
                key={type}
                className="btn btn-secondary"
                id={`showcase-toast-${type}`}
                onClick={() => toast[type](msg)}
              >
                {label}
              </button>
            ))}
          </div>
        </Section>

        {/* Footer note */}
        <div
          className="text-center py-6 rounded-2xl mt-4"
          style={{ background: 'var(--color-primary-light)', border: '1px solid rgba(37,99,235,0.15)' }}
        >
          <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
            ✅ All Phase 2 components verified — this route will be removed in Phase 7.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComponentShowcase;
