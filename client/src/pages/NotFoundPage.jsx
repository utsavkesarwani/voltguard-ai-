import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Zap } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--gradient-hero)' }}
    >
      <div className="text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="mb-8"
        >
          {/* 404 visual */}
          <div className="relative inline-block">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-4"
              style={{
                background: 'var(--color-primary-light)',
                border: '1px solid rgba(37,99,235,0.2)',
              }}
            >
              <Zap className="w-12 h-12" style={{ color: 'var(--color-primary)' }} />
            </div>
          </div>
          <h1
            className="text-8xl font-black mb-2 gradient-text"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            404
          </h1>
          <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--color-heading)' }}>
            Page Not Found
          </h2>
          <p className="text-base mb-8" style={{ color: 'var(--color-text)' }}>
            Looks like this circuit doesn't exist. The page you're looking for has been removed
            or the URL is incorrect.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link to="/" className="btn btn-primary" id="notfound-home">
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-secondary"
            id="notfound-back"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
