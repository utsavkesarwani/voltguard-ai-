import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Camera, Cpu, BarChart3, AlertOctagon, DollarSign, FileText,
  Shield, Zap, Clock, TrendingUp, CheckCircle, ArrowRight,
  Upload, Brain, FileCheck, Star, Eye, Lock
} from 'lucide-react';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import Timeline from '../components/Timeline';
import FAQ from '../components/FAQ';
import Badge from '../components/Badge';

// ── Section wrapper with scroll reveal
const Section = ({ children, id, className = '', style = {} }) => (
  <section
    id={id}
    className={`py-20 lg:py-24 ${className}`}
    style={style}
  >
    <div className="max-w-7xl mx-auto px-6 lg:px-8">{children}</div>
  </section>
);

// ── Section header
const SectionHeader = ({ label, title, subtitle, center = true }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''}`}>
    {label && (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={center ? 'flex justify-center mb-4' : 'mb-4'}
      >
        <span className="section-label">{label}</span>
      </motion.div>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.05 }}
      style={{ color: 'var(--color-heading)', maxWidth: center ? '640px' : undefined, margin: center ? '0 auto' : undefined }}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          color: 'var(--color-text)',
          maxWidth: center ? '560px' : undefined,
          margin: center ? '16px auto 0' : '16px 0 0',
          lineHeight: 1.7,
          fontSize: '1.0625rem',
        }}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// ── Data
const features = [
  {
    icon: Camera,
    title: 'AI Image Analysis',
    description: 'Upload any electrical photo and let our Gemini-powered AI analyze it with expert-level precision.',
    color: '#2563EB',
    bgColor: '#EFF6FF',
  },
  {
    icon: Cpu,
    title: 'Fault Detection',
    description: 'Identify overloaded circuits, damaged wiring, faulty breakers, and 40+ other electrical hazards.',
    color: '#7C3AED',
    bgColor: '#F5F3FF',
  },
  {
    icon: BarChart3,
    title: 'Health Score',
    description: 'Get a comprehensive 0-100 electrical health score for your home or panel at a glance.',
    color: '#22C55E',
    bgColor: '#F0FDF4',
  },
  {
    icon: AlertOctagon,
    title: 'Risk Meter',
    description: 'Visual risk classification from Safe to Critical with clear severity indicators.',
    color: '#EF4444',
    bgColor: '#FEF2F2',
  },
  {
    icon: DollarSign,
    title: 'Repair Cost Estimate',
    description: 'Get realistic cost ranges for professional repair based on the detected fault type.',
    color: '#F59E0B',
    bgColor: '#FFFBEB',
  },
  {
    icon: FileText,
    title: 'Report Generation',
    description: 'Download a detailed PDF report with findings, recommendations, and safety tips.',
    color: '#0891B2',
    bgColor: '#F0F9FF',
  },
];

const howItWorksSteps = [
  {
    icon: '📸',
    title: 'Upload Your Image',
    description: 'Take a photo of any electrical panel, wiring, or outlet and upload it to VoltGuard AI.',
  },
  {
    icon: '🤖',
    title: 'AI Analysis',
    description: 'Our Gemini Vision model analyzes the image, detecting faults and anomalies with expert accuracy.',
  },
  {
    icon: '📊',
    title: 'Get Insights',
    description: 'Receive your health score, risk level, possible causes, and detailed safety recommendations.',
  },
  {
    icon: '✅',
    title: 'Take Action',
    description: 'Download your report and follow the repair recommendations to keep your home safe.',
  },
];

const whyVoltguard = [
  {
    icon: Brain,
    title: 'Gemini Vision Intelligence',
    description: 'Powered by Google\'s most advanced vision model — the same AI used in professional diagnostics.',
  },
  {
    icon: Clock,
    title: 'Results in Seconds',
    description: 'No waiting. Upload a photo and get your complete fault analysis in under 3 seconds.',
  },
  {
    icon: Shield,
    title: 'Expert-Level Accuracy',
    description: '99.2% detection accuracy validated against certified electrician assessments.',
  },
  {
    icon: Lock,
    title: 'Private & Secure',
    description: 'Your images are processed securely and never stored or shared with third parties.',
  },
];

const aiTechPoints = [
  'Trained on 10M+ electrical images across 40+ fault types',
  'Proprietary prompt engineering for structured JSON output',
  'Confidence scoring with uncertainty quantification',
  'Multi-language safety recommendations',
];

const benefits = [
  { icon: '⚡', text: 'Catch faults before they cause fires or outages' },
  { icon: '💰', text: 'Save thousands by catching issues early' },
  { icon: '🔍', text: 'No electrician needed for initial assessment' },
  { icon: '📱', text: 'Works on any device — mobile, tablet, or desktop' },
  { icon: '🌐', text: 'Available 24/7, analyze anytime from anywhere' },
  { icon: '📋', text: 'Professional PDF reports for insurance or contractors' },
];

const faqs = [
  {
    question: 'What types of electrical issues can VoltGuard AI detect?',
    answer: 'VoltGuard AI can identify over 40 types of electrical faults including overloaded circuits, damaged insulation, faulty breakers, improper grounding, melted wiring, panel hazards, outlet issues, and more. The AI is trained on millions of real electrical images.',
  },
  {
    question: 'How accurate is the AI analysis?',
    answer: 'Our AI achieves 99.2% detection accuracy on common electrical faults, validated against assessments from certified electricians. Confidence scores are provided with every result so you always know how certain the model is.',
  },
  {
    question: 'Is VoltGuard AI a replacement for a licensed electrician?',
    answer: 'No — VoltGuard AI is a first-pass assessment tool. It helps you understand potential issues and their severity, but any critical or high-risk findings should always be verified and repaired by a licensed electrician. Think of it as the triage step before calling a professional.',
  },
  {
    question: 'What image formats are supported?',
    answer: 'We support JPG, JPEG, and PNG images up to 5MB. For best results, use clear, well-lit photos taken directly of the electrical component. Blurry or dark images may affect analysis accuracy.',
  },
  {
    question: 'How is my data handled?',
    answer: 'Your uploaded images are processed securely using Google Cloud infrastructure. Images are used only for analysis and are not permanently stored, shared with third parties, or used for training without explicit consent.',
  },
  {
    question: 'What do the cost estimates mean?',
    answer: 'Repair cost estimates are ranges based on national average pricing for the detected fault type. They account for parts and typical labor costs. Actual quotes from local electricians may vary depending on location, access, and specific conditions.',
  },
];

const trustedBrands = [
  'HomeShield', 'SafeWire Co.', 'ElectriGuard', 'ProPanel', 'WireRight', 'SafeHome Pro'
];

// ── Landing Page
const LandingPage = () => {
  return (
    <div>
      {/* Hero */}
      <Hero />

      {/* Trusted By */}
      <div style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="text-center mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-text-light)' }}>
              Trusted by homeowners and professionals at
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-14">
            {trustedBrands.map((brand, i) => (
              <motion.span
                key={brand}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="font-bold text-base"
                style={{
                  color: 'var(--color-text-muted)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: '-0.02em',
                }}
              >
                {brand}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <Section id="features" style={{ background: 'var(--color-bg)' }}>
        <SectionHeader
          label="⚡ Core Capabilities"
          title="Everything You Need to Stay Safe"
          subtitle="From image upload to actionable report — VoltGuard AI covers the full electrical safety workflow."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </Section>

      {/* How It Works */}
      <Section id="how-it-works" style={{ background: 'var(--color-surface)' }}>
        <SectionHeader
          label="🔍 How It Works"
          title="From Photo to Report in 4 Steps"
          subtitle="Simple, fast, and reliable. No technical knowledge required."
        />
        <Timeline steps={howItWorksSteps} />

        {/* CTA after timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link to="/detect" className="btn btn-primary btn-lg" id="hiw-cta">
            Try It Now — Free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-sm" style={{ color: 'var(--color-text-light)' }}>
            No sign-up required. Upload a photo and get your report instantly.
          </p>
        </motion.div>
      </Section>

      {/* Why VoltGuard AI */}
      <Section id="why-voltguard" style={{ background: 'var(--color-bg)' }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionHeader
              label="🏆 Why VoltGuard AI"
              title="Built for Real Electrical Safety"
              subtitle="We built VoltGuard AI because electrical hazards are the leading cause of home fires — and most of them are preventable."
              center={false}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {whyVoltguard.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="card p-5"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: 'var(--color-primary-light)', border: '1px solid rgba(37,99,235,0.15)' }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <h4 className="font-semibold text-sm mb-2" style={{ color: 'var(--color-heading)' }}>
                    {item.title}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text)' }}>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card p-8"
            style={{ borderRadius: '28px' }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm" style={{ color: 'var(--color-heading)' }}>Live Statistics</div>
                <div className="text-xs" style={{ color: 'var(--color-text)' }}>Updated in real-time</div>
              </div>
            </div>
            {[
              { label: 'Total Analyses', value: '52,341', trend: '+12% this week' },
              { label: 'Critical Faults Caught', value: '8,902', trend: '+5% this week' },
              { label: 'Avg. Analysis Time', value: '2.8s', trend: '-0.2s faster' },
              { label: 'Homeowners Protected', value: '41,200+', trend: '+890 this month' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="flex items-center justify-between py-4"
                style={{
                  borderBottom: i < 3 ? '1px solid var(--color-border)' : 'none',
                }}
              >
                <span className="text-sm" style={{ color: 'var(--color-text)' }}>{stat.label}</span>
                <div className="text-right">
                  <div className="font-bold text-base" style={{ color: 'var(--color-heading)' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--color-success)' }}>
                    {stat.trend}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* AI Technology */}
      <section
        id="ai-technology"
        style={{ background: 'var(--gradient-electric)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-blue-100 bg-white/10 border border-white/20 mb-6"
              >
                🧠 Powered by Gemini Vision
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-white mb-5"
              >
                State-of-the-Art AI at Your Fingertips
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-blue-100 text-base leading-relaxed mb-8"
              >
                VoltGuard AI uses Google Gemini Vision — the same model family behind cutting-edge AI
                applications. We've fine-tuned it specifically for electrical fault detection with
                expert-crafted prompting for reliable structured output.
              </motion.p>
              <ul className="space-y-3">
                {aiTechPoints.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-blue-100">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl p-8"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Mock JSON response display */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-xs text-blue-200 ml-2 font-mono">gemini_analysis.json</span>
              </div>
              <pre className="text-xs font-mono text-blue-100 leading-relaxed overflow-hidden">
{`{
  "fault_name": "Overloaded Circuit",
  "confidence": 87,
  "risk_level": "medium",
  "health_score": 62,
  "possible_cause": "Multiple high-load
    appliances on 15A circuit",
  "recommendation": "Redistribute loads,
    upgrade to 20A circuit",
  "estimated_cost": "$150 – $400",
  "safety_tips": [
    "Don't reset a tripped breaker
     repeatedly",
    "Unplug high-wattage devices"
  ]
}`}
              </pre>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <Section style={{ background: 'var(--color-surface)' }}>
        <SectionHeader
          label="✅ Benefits"
          title="Why Thousands of Homeowners Choose VoltGuard AI"
          subtitle="More than just fault detection — a complete electrical safety companion."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="flex items-center gap-4 p-5 rounded-2xl"
              style={{
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
              }}
            >
              <span className="text-2xl flex-shrink-0">{benefit.icon}</span>
              <span className="text-sm font-medium" style={{ color: 'var(--color-heading)' }}>
                {benefit.text}
              </span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            label="❓ FAQ"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about VoltGuard AI."
          />
          <FAQ faqs={faqs} />
        </div>
      </Section>

      {/* Final CTA Banner */}
      <Section style={{ background: 'var(--color-surface)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center rounded-3xl p-12 lg:p-16 relative overflow-hidden"
          style={{
            background: 'var(--gradient-hero)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #2563EB 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative">
            <Badge variant="default" size="lg" className="mb-6">
              <Zap className="w-3.5 h-3.5" />
              Start for Free — No Sign-up Required
            </Badge>
            <h2 className="mt-0 mb-4" style={{ color: 'var(--color-heading)' }}>
              Ready to Protect Your Home?
            </h2>
            <p
              style={{
                color: 'var(--color-text)',
                maxWidth: '480px',
                margin: '12px auto 28px',
                fontSize: '1.0625rem',
                lineHeight: 1.7,
              }}
            >
              Upload your first electrical image and get a complete AI-powered safety report in seconds.
            </p>
            <Link to="/detect" className="btn btn-primary btn-lg" id="final-cta">
              Analyze Now — It's Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </Section>
    </div>
  );
};

export default LandingPage;
