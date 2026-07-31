import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import UploadArea from '../components/UploadArea';
import Loader from '../components/Loader';

const MOCK_RESULT_ID = 'mock-result-001';

const LOADING_MESSAGES = [
  'Uploading image…',
  'Analyzing electrical patterns…',
  'Detecting fault signatures…',
  'Generating your report…',
];

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const DetectPage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateFile = (f) => {
    if (!ALLOWED_TYPES.includes(f.type)) return 'Please upload a JPG or PNG image.';
    if (f.size > 5 * 1024 * 1024) return 'File too large. Please upload an image under 5MB.';
    return null;
  };

  const handleFile = (f) => {
    setError(null);
    const err = validateFile(f);
    if (err) { setError(err); return; }
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    let msgIndex = 0;
    setLoadingMsg(LOADING_MESSAGES[0]);
    const interval = setInterval(() => {
      msgIndex = (msgIndex + 1) % LOADING_MESSAGES.length;
      setLoadingMsg(LOADING_MESSAGES[msgIndex]);
    }, 1200);

    // TODO Phase 7: Replace with real API call
    await new Promise((r) => setTimeout(r, 4000));
    clearInterval(interval);
    setLoading(false);
    navigate(`/result/${MOCK_RESULT_ID}`);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-16 lg:pt-32 relative"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{
              background: 'var(--gradient-primary)',
              boxShadow: '0 8px 25px rgba(37,99,235,0.35)',
            }}
          >
            <Zap className="w-7 h-7 text-white" fill="white" />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-heading)' }}>
            Analyze Electrical Image
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text)' }}>
            Upload a clear photo of any electrical component to get your AI-powered report.
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {loading ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-12 flex flex-col items-center justify-center"
              style={{ borderRadius: '28px', minHeight: '240px' }}
            >
              <Loader message={loadingMsg} size="md" />
            </motion.div>
          ) : (
            <UploadArea
              file={file}
              preview={preview}
              dragActive={dragActive}
              error={error}
              onFile={handleFile}
              onClear={handleClear}
            />
          )}
        </motion.div>

        {/* Analyze Button */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6"
          >
            <button
              onClick={handleAnalyze}
              disabled={!file}
              className="btn btn-primary w-full"
              style={{ padding: '16px', fontSize: '1rem', borderRadius: '999px' }}
              id="analyze-button"
            >
              <Zap className="w-5 h-5" />
              Analyze with AI
            </button>
          </motion.div>
        )}

        <p className="text-center text-xs mt-5" style={{ color: 'var(--color-text-light)' }}>
          Your image is processed securely and not stored permanently.
        </p>
      </div>
    </div>
  );
};

export default DetectPage;
