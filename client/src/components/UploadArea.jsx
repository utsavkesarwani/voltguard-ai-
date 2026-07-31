import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image, X, AlertCircle } from 'lucide-react';

/**
 * UploadArea — Drag-and-drop file upload zone
 * Props:
 *   file (File|null), preview (string|null), dragActive (bool),
 *   error (string|null),
 *   onFile (fn: File → void), onClear (fn: void → void),
 *   onDragOver, onDragLeave, onDrop, onClick
 *
 * Usage: pass all state + handlers from the parent page.
 */
const UploadArea = ({
  file = null,
  preview = null,
  dragActive = false,
  error = null,
  onFile,
  onClear,
}) => {
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) onFile?.(dropped);
  };

  const handleInputChange = (e) => {
    const chosen = e.target.files[0];
    if (chosen) onFile?.(chosen);
    // reset so the same file can be re-selected
    e.target.value = '';
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {!file ? (
          /* ── Drop zone ── */
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={(e) => { e.preventDefault(); }}
            onDragLeave={() => {}}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-12 text-center transition-all duration-200"
            style={{
              background: dragActive ? 'rgba(37,99,235,0.05)' : 'var(--color-surface)',
              borderColor: dragActive ? 'var(--color-primary)' : 'var(--color-border)',
              boxShadow: dragActive
                ? '0 0 0 4px rgba(37,99,235,0.1)'
                : 'var(--shadow-md)',
              transform: dragActive ? 'scale(1.01)' : 'scale(1)',
            }}
            id="upload-area"
            role="button"
            aria-label="Upload image area"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
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
          /* ── Preview ── */
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl overflow-hidden"
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
                onClick={(e) => { e.stopPropagation(); onClear?.(); }}
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.6)', color: 'white', cursor: 'pointer', border: 'none' }}
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
    </div>
  );
};

export default UploadArea;
