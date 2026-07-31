import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image, X, Zap, AlertCircle } from 'lucide-react';

const MOCK_RESULT_ID = 'mock-result-001';

const DetectPage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const loadingMessages = [
    'Uploading image…',
    'Analyzing electrical patterns…',
    'Detecting fault signatures…',
    'Generating your report…',
  ];

  const validateFile = (f) => {
    const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowed.includes(f.type)) {
      return 'Please upload a JPG or PNG image.';
    }
    if (f.size > 5 * 1024 * 1024) {
      return 'File too large. Please upload an image under 5MB.';
    }
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

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  };

  const handleInputChange = (e) => {
    const chosen = e.target.files[0];
    if (chosen) handleFile(chosen);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    // Cycle through loading messages
    let msgIndex = 0;
    setLoadingMsg(loadingMessages[0]);
    const interval = setInterval(() => {
      msgIndex = (msgIndex + 1) % loadingMessages.length;
      setLoadingMsg(loadingMessages[msgIndex]);
    }, 1200);

    // TODO Phase 7: Replace with real API call
    // For now, simulate 4s delay and navigate to mock result
    await new Promise((r) => setTimeout(r, 4000));
    clearInterval(interval);
    setLoading(false);
    navigate(`/result/${MOCK_RESULT_ID}`);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Back to grid pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
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
          className="text-center mb-8"
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
          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-12 text-center transition-all duration-200"
                style={{
                  background: dragActive ? 'rgba(37,99,235,0.05)' : 'var(--color-surface)',
                  borderColor: dragActive ? 'var(--color-primary)' : 'var(--color-border)',
                  boxShadow: dragActive ? '0 0 0 4px rgba(37,99,235,0.1)' : 'var(--shadow-md)',
                  transform: dragActive ? 'scale(1.01)' : 'scale(1)',
                }}
                id="upload-area"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    background: dragActive ? 'var(--color-primary-light)' : 'var(--color-bg)',
                    border: `1px solid ${dragActive ? 'rgba(37,99,235,0.3)' : 'var(--color-border)'}`,
                  }}
                >
                  <Upload
                    className="w-8 h-8"
                    style={{ color: dragActive ? 'var(--color-primary)' : 'var(--color-text)' }}
                  />
                </div>
                <p className="font-semibold mb-1" style={{ color: 'var(--color-heading)' }}>
                  {dragActive ? 'Drop your image here' : 'Drag & drop your image'}
                </p>
                <p className="text-sm mb-4" style={{ color: 'var(--color-text)' }}>
                  or <span className="text-blue-600 font-medium">click to browse</span>
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-light)' }}>
                  JPG, PNG up to 5MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleInputChange}
                  className="hidden"
                  id="file-input"
                />
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl overflow-hidden relative"
                style={{
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-xl)',
                  background: 'var(--color-surface)',
                }}
              >
                <div className="relative">
                  <img
                    src={preview}
                    alt="Uploaded electrical image"
                    className="w-full object-cover"
                    style={{ maxHeight: '300px' }}
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); clearFile(); }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.6)', color: 'white' }}
                    aria-label="Remove image"
                    id="remove-image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--color-primary-light)' }}
                  >
                    <Image className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate" style={{ color: 'var(--color-heading)' }}>
                      {file.name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text)' }}>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Inline error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-3 flex items-start gap-2 px-4 py-3 rounded-2xl"
                style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}
              >
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#EF4444' }} />
                <p className="text-sm" style={{ color: '#B91C1C' }}>{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Analyze Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5"
        >
          {loading ? (
            <div
              className="w-full py-4 rounded-full flex items-center justify-center gap-3"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
              />
              <span className="text-white font-semibold text-sm">{loadingMsg}</span>
            </div>
          ) : (
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
          )}
        </motion.div>

        <p className="text-center text-xs mt-4" style={{ color: 'var(--color-text-light)' }}>
          Your image is processed securely and not stored permanently.
        </p>
      </div>
    </div>
  );
};

export default DetectPage;
