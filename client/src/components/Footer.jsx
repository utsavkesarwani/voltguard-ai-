import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, MessageSquare, GitBranch, Users, Mail, ArrowRight } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Analyze Image', href: '/detect' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Disclaimer', href: '#' },
  ],
};

const socials = [
  { icon: MessageSquare, label: 'Twitter / X', href: '#' },
  { icon: GitBranch, label: 'GitHub', href: '#' },
  { icon: Users, label: 'LinkedIn', href: '#' },
  { icon: Mail, label: 'Email', href: '#' },
];

const Footer = () => {
  return (
    <footer
      className="border-t"
      style={{
        background: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      {/* Newsletter Strip */}
      <div
        style={{
          background: 'var(--gradient-electric)',
          padding: '56px 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                Stay ahead of electrical hazards
              </h3>
              <p className="text-blue-100 text-sm">
                Get safety tips and product updates in your inbox.
              </p>
            </div>
            <div className="flex gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-72 px-4 py-3 rounded-full text-sm text-gray-800 bg-white outline-none border-none"
                style={{ fontFamily: 'inherit' }}
              />
              <button className="btn btn-secondary flex-shrink-0" style={{ borderRadius: '999px' }}>
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-5 w-fit">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <span
                className="font-bold text-lg"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: 'var(--color-heading)',
                }}
              >
                VoltGuard <span className="gradient-text">AI</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text)', maxWidth: '280px' }}>
              AI-powered electrical fault detection that helps homeowners and professionals
              identify hazards before they become dangerous.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-primary)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--color-bg)';
                    e.currentTarget.style.color = 'var(--color-text)';
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: 'var(--color-heading)' }}
              >
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm transition-colors duration-200 hover:text-blue-600"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--color-text-light)' }}>
            © 2025 VoltGuard AI. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-light)' }}>
            <span>Powered by</span>
            <span className="font-semibold gradient-text">Gemini Vision</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
