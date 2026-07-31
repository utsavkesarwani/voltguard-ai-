import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Upload, ArrowLeft } from 'lucide-react';
import ResultCard from '../components/ResultCard';
import RiskMeter from '../components/RiskMeter';

// Mock report data — Phase 7 will replace with real API fetch
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

const ResultPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Use mock report for now — Phase 7 will fetch by id from API
  const report = MOCK_REPORT;

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate('/detect')}
          className="flex items-center gap-2 mb-8 text-sm font-medium group"
          style={{ color: 'var(--color-text)', background: 'none', border: 'none', cursor: 'pointer' }}
          id="back-to-detect"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Analyze another image
        </motion.button>

        {/* Result Card (renders header banner + main card) */}
        <ResultCard report={report} />

        {/* Risk Meter — standalone block below the main card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="card p-6 mb-6 mt-6"
          style={{ borderRadius: '24px' }}
        >
          <p
            className="text-xs font-medium uppercase tracking-wider mb-4"
            style={{ color: 'var(--color-text-light)' }}
          >
            Risk Level
          </p>
          <RiskMeter level={report.riskLevel} />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex gap-3"
        >
          <button
            className="btn btn-primary flex-1"
            id="download-report"
            onClick={() => alert('PDF report download — coming in a future phase!')}
          >
            <Download className="w-4 h-4" />
            Download Report
          </button>
          <Link to="/detect" className="btn btn-secondary flex-1" id="upload-another">
            <Upload className="w-4 h-4" />
            Analyze Another
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultPage;
