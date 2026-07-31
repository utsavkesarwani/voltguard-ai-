import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BarChart3, AlertOctagon, CheckCircle, TrendingUp,
  Search, Upload, ChevronLeft, ChevronRight,
} from 'lucide-react';
import Badge from '../components/Badge';
import StatisticCard from '../components/StatisticCard';

// ── Mock Data ──────────────────────────────────────────────────────────────────
const MOCK_STATS = {
  totalAnalyses: 52,
  critical: 8,
  medium: 14,
  safe: 30,
};

const MOCK_REPORTS = [
  { id: '1', faultName: 'Overloaded Circuit Breaker', riskLevel: 'medium',   confidence: 87, createdAt: '2025-07-28' },
  { id: '2', faultName: 'Damaged Wire Insulation',    riskLevel: 'critical',  confidence: 94, createdAt: '2025-07-25' },
  { id: '3', faultName: 'Loose Neutral Connection',   riskLevel: 'low',       confidence: 78, createdAt: '2025-07-22' },
  { id: '4', faultName: 'No Visible Fault Detected',  riskLevel: 'safe',      confidence: 96, createdAt: '2025-07-20' },
  { id: '5', faultName: 'Panel Corrosion',            riskLevel: 'medium',    confidence: 82, createdAt: '2025-07-18' },
  { id: '6', faultName: 'Burnt Outlet Socket',        riskLevel: 'critical',  confidence: 91, createdAt: '2025-07-15' },
];

const ITEMS_PER_PAGE = 5;

const statCards = [
  { icon: BarChart3,    label: 'Total Analyses', key: 'totalAnalyses', color: '#2563EB', bgColor: '#EFF6FF', trend: '+12% this week', trendUp: true },
  { icon: AlertOctagon, label: 'Critical Faults', key: 'critical',      color: '#EF4444', bgColor: '#FEF2F2', trend: '+2 this week',   trendUp: false },
  { icon: TrendingUp,   label: 'Medium Risk',     key: 'medium',        color: '#F97316', bgColor: '#FFF7ED', trend: '+3 this week',   trendUp: false },
  { icon: CheckCircle,  label: 'Safe',            key: 'safe',          color: '#22C55E', bgColor: '#F0FDF4', trend: '+7 this week',   trendUp: true },
];

// ── Component ──────────────────────────────────────────────────────────────────
const DashboardPage = () => {
  const [search, setSearch]       = useState('');
  const [filterRisk, setFilterRisk] = useState('');
  const [page, setPage]           = useState(1);

  const filtered = MOCK_REPORTS.filter((r) => {
    const matchSearch = r.faultName.toLowerCase().includes(search.toLowerCase());
    const matchRisk   = filterRisk ? r.riskLevel === filterRisk : true;
    return matchSearch && matchRisk;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged      = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Reset to page 1 when filter/search changes
  const handleSearch = (v) => { setSearch(v); setPage(1); };
  const handleFilter = (v) => { setFilterRisk(v); setPage(1); };

  return (
    <div className="min-h-screen py-10 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-5xl mx-auto">

        {/* ── Page Header ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="mb-1" style={{ color: 'var(--color-heading)' }}>Dashboard</h1>
            <p className="text-sm" style={{ color: 'var(--color-text)' }}>
              Your electrical analysis history and statistics.
            </p>
          </div>
          <Link to="/detect" className="btn btn-primary" id="dashboard-analyze-cta">
            <Upload className="w-4 h-4" />
            New Analysis
          </Link>
        </motion.div>

        {/* ── Stat Cards ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map(({ icon, label, key, color, bgColor, trend, trendUp }, index) => (
            <StatisticCard
              key={label}
              icon={icon}
              label={label}
              value={MOCK_STATS[key]}
              color={color}
              bgColor={bgColor}
              trend={trend}
              trendUp={trendUp}
              index={index}
            />
          ))}
        </div>

        {/* ── Reports Table ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card"
          style={{ borderRadius: '24px', overflow: 'hidden' }}
        >
          {/* Table Header */}
          <div
            className="p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
            style={{ borderBottom: '1px solid var(--color-border)' }}
          >
            <h3 style={{ color: 'var(--color-heading)' }}>Recent Reports</h3>
            <div className="flex gap-3 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:w-60">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: 'var(--color-text)' }}
                />
                <input
                  type="text"
                  placeholder="Search reports…"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-heading)',
                    fontFamily: 'inherit',
                  }}
                  id="dashboard-search"
                />
              </div>
              {/* Filter */}
              <select
                value={filterRisk}
                onChange={(e) => handleFilter(e.target.value)}
                className="px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                }}
                id="dashboard-filter"
              >
                <option value="">All risks</option>
                <option value="safe">Safe</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          {/* Table Body */}
          {paged.length === 0 ? (
            <div className="py-20 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <p className="font-semibold mb-1" style={{ color: 'var(--color-heading)' }}>
                No reports match your search
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text)' }}>
                Try adjusting the filter or search term.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'var(--color-bg)' }}>
                    {['Fault Name', 'Risk', 'Confidence', 'Date', ''].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                        style={{ color: 'var(--color-text-light)' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paged.map((report, index) => (
                    <motion.tr
                      key={report.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06 }}
                      className="border-t transition-colors"
                      style={{ borderColor: 'var(--color-border)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-bg)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = ''; }}
                    >
                      <td className="px-6 py-4">
                        <span className="font-medium text-sm" style={{ color: 'var(--color-heading)' }}>
                          {report.faultName}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={report.riskLevel} size="sm">
                          {report.riskLevel.charAt(0).toUpperCase() + report.riskLevel.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold gradient-text">{report.confidence}%</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm" style={{ color: 'var(--color-text)' }}>{report.createdAt}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/result/${report.id}`}
                          className="text-sm font-medium hover:underline"
                          style={{ color: 'var(--color-primary)' }}
                          id={`view-report-${report.id}`}
                        >
                          View →
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            <span className="text-sm" style={{ color: 'var(--color-text)' }}>
              Showing {paged.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1}
              {paged.length > 1 ? `–${(page - 1) * ITEMS_PER_PAGE + paged.length}` : ''} of{' '}
              {filtered.length} report{filtered.length !== 1 ? 's' : ''}
            </span>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={{
                  border: '1px solid var(--color-border)',
                  color: page === 1 ? 'var(--color-text-light)' : 'var(--color-text)',
                  cursor: page === 1 ? 'not-allowed' : 'pointer',
                  background: 'none',
                  opacity: page === 1 ? 0.5 : 1,
                }}
                id="pagination-prev"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all"
                  style={{
                    background: p === page ? 'var(--gradient-primary)' : 'none',
                    color: p === page ? 'white' : 'var(--color-text)',
                    border: p === page ? 'none' : '1px solid var(--color-border)',
                    cursor: 'pointer',
                  }}
                  id={`pagination-page-${p}`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={{
                  border: '1px solid var(--color-border)',
                  color: page === totalPages ? 'var(--color-text-light)' : 'var(--color-text)',
                  cursor: page === totalPages ? 'not-allowed' : 'pointer',
                  background: 'none',
                  opacity: page === totalPages ? 0.5 : 1,
                }}
                id="pagination-next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
