import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BarChart3, AlertOctagon, CheckCircle, TrendingUp,
  Search, Filter, Upload, ChevronLeft, ChevronRight
} from 'lucide-react';
import Badge from '../components/Badge';

// Mock statistics
const MOCK_STATS = {
  totalAnalyses: 52,
  critical: 8,
  medium: 14,
  safe: 30,
};

// Mock reports
const MOCK_REPORTS = [
  {
    id: '1', faultName: 'Overloaded Circuit Breaker', riskLevel: 'medium',
    confidence: 87, createdAt: '2025-07-28', image: null,
  },
  {
    id: '2', faultName: 'Damaged Wire Insulation', riskLevel: 'critical',
    confidence: 94, createdAt: '2025-07-25', image: null,
  },
  {
    id: '3', faultName: 'Loose Neutral Connection', riskLevel: 'low',
    confidence: 78, createdAt: '2025-07-22', image: null,
  },
  {
    id: '4', faultName: 'No Visible Fault Detected', riskLevel: 'safe',
    confidence: 96, createdAt: '2025-07-20', image: null,
  },
  {
    id: '5', faultName: 'Panel Corrosion', riskLevel: 'medium',
    confidence: 82, createdAt: '2025-07-18', image: null,
  },
];

const statCards = [
  {
    icon: BarChart3,
    label: 'Total Analyses',
    key: 'totalAnalyses',
    color: '#2563EB',
    bg: '#EFF6FF',
  },
  {
    icon: AlertOctagon,
    label: 'Critical Faults',
    key: 'critical',
    color: '#EF4444',
    bg: '#FEF2F2',
  },
  {
    icon: TrendingUp,
    label: 'Medium Risk',
    key: 'medium',
    color: '#F97316',
    bg: '#FFF7ED',
  },
  {
    icon: CheckCircle,
    label: 'Safe',
    key: 'safe',
    color: '#22C55E',
    bg: '#F0FDF4',
  },
];

const DashboardPage = () => {
  const [search, setSearch] = useState('');
  const [filterRisk, setFilterRisk] = useState('');

  const filtered = MOCK_REPORTS.filter((r) => {
    const matchSearch = r.faultName.toLowerCase().includes(search.toLowerCase());
    const matchRisk = filterRisk ? r.riskLevel === filterRisk : true;
    return matchSearch && matchRisk;
  });

  return (
    <div className="min-h-screen py-10 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
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

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map(({ icon: Icon, label, key, color, bg }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="card p-5"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: bg, border: `1px solid ${color}22` }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: 'var(--color-heading)' }}>
                {MOCK_STATS[key]}
              </div>
              <div className="text-sm" style={{ color: 'var(--color-text)' }}>{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Reports Table */}
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
                  onChange={(e) => setSearch(e.target.value)}
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
                onChange={(e) => setFilterRisk(e.target.value)}
                className="px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  fontFamily: 'inherit',
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

          {/* Table */}
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <div className="text-4xl mb-3">🔍</div>
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
                  {filtered.map((report, index) => (
                    <motion.tr
                      key={report.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06 }}
                      className="border-t"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <td className="px-6 py-4">
                        <span
                          className="font-medium text-sm"
                          style={{ color: 'var(--color-heading)' }}
                        >
                          {report.faultName}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={report.riskLevel} size="sm">
                          {report.riskLevel.charAt(0).toUpperCase() + report.riskLevel.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold gradient-text">
                          {report.confidence}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm" style={{ color: 'var(--color-text)' }}>
                          {report.createdAt}
                        </span>
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
              Showing {filtered.length} of {MOCK_REPORTS.length} reports
            </span>
            <div className="flex gap-2">
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                disabled
                id="pagination-prev"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white"
                style={{ background: 'var(--gradient-primary)' }}
                id="pagination-page-1"
              >
                1
              </button>
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
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
