import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, RotateCcw } from 'lucide-react';

export default function MediaLightbox({ items, currentIndex, onClose, onNavigate }) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const item = items[currentIndex];
  const isImage = item?.media_type !== 'video';
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  useEffect(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, [currentIndex]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext) onNavigate(currentIndex + 1);
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate(currentIndex - 1);
      if ((e.key === '+' || e.key === '=') && isImage) setZoom(z => Math.min(z + 0.5, 5));
      if (e.key === '-' && isImage) setZoom(z => Math.max(z - 0.5, 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentIndex, hasPrev, hasNext, isImage]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleDownload = async e => {
    e.stopPropagation();
    try {
      const response = await fetch(item.file_url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = item.title || 'media';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback: open in new tab
      window.open(item.file_url, '_blank');
    }
  };

  const onMouseDown = e => {
    if (zoom <= 1) return;
    e.preventDefault();
    setDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };
  const onMouseMove = e => {
    if (!dragging) return;
    setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const onMouseUp = () => setDragging(false);

  if (!item) return null;

  const content = (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(0,0,0,0.96)',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {/* Top toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          flexShrink: 0,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div>
          <p style={{ color: '#fff', fontWeight: 600, fontSize: 14, margin: 0 }}>{item.title}</p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, margin: 0 }}>
            {currentIndex + 1} / {items.length}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {isImage && (
            <>
              <Btn
                onClick={e => {
                  e.stopPropagation();
                  setZoom(z => Math.max(z - 0.5, 1));
                }}
                disabled={zoom <= 1}
              >
                <ZoomOut size={16} />
              </Btn>
              <span
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: 12,
                  minWidth: 40,
                  textAlign: 'center',
                }}
              >
                {Math.round(zoom * 100)}%
              </span>
              <Btn
                onClick={e => {
                  e.stopPropagation();
                  setZoom(z => Math.min(z + 0.5, 5));
                }}
                disabled={zoom >= 5}
              >
                <ZoomIn size={16} />
              </Btn>
              {zoom !== 1 && (
                <Btn
                  onClick={e => {
                    e.stopPropagation();
                    setZoom(1);
                    setOffset({ x: 0, y: 0 });
                  }}
                >
                  <RotateCcw size={16} />
                </Btn>
              )}
              <Btn onClick={handleDownload}>
                <Download size={16} />
              </Btn>
            </>
          )}
          <Btn
            onClick={e => {
              e.stopPropagation();
              onClose();
            }}
            style={{ marginLeft: 8, background: 'rgba(255,255,255,0.15)' }}
          >
            <X size={18} />
          </Btn>
        </div>
      </div>

      {/* Main image area */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
        onClick={onClose}
      >
        {/* Prev button */}
        {hasPrev && (
          <button
            onClick={e => {
              e.stopPropagation();
              onNavigate(currentIndex - 1);
            }}
            style={navBtnStyle('left')}
          >
            <ChevronLeft size={28} color="#fff" />
          </button>
        )}

        {/* Next button */}
        {hasNext && (
          <button
            onClick={e => {
              e.stopPropagation();
              onNavigate(currentIndex + 1);
            }}
            style={navBtnStyle('right')}
          >
            <ChevronRight size={28} color="#fff" />
          </button>
        )}

        {/* Media */}
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            onClick={e => e.stopPropagation()}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {isImage ? (
              <img
                src={item.file_url}
                alt={item.title}
                draggable={false}
                onMouseDown={onMouseDown}
                style={{
                  maxWidth: '88vw',
                  maxHeight: 'calc(100vh - 160px)',
                  objectFit: 'contain',
                  borderRadius: 8,
                  userSelect: 'none',
                  cursor: zoom > 1 ? (dragging ? 'grabbing' : 'grab') : 'default',
                  transform: `scale(${zoom}) translate(${offset.x / zoom}px, ${offset.y / zoom}px)`,
                  transition: dragging ? 'none' : 'transform 0.2s ease',
                }}
              />
            ) : (
              <video
                src={item.file_url}
                controls
                autoPlay
                style={{ maxWidth: '88vw', maxHeight: 'calc(100vh - 160px)', borderRadius: 8 }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail strip */}
      <div
        style={{
          flexShrink: 0,
          padding: '10px 16px',
          display: 'flex',
          gap: 8,
          justifyContent: 'center',
          overflowX: 'auto',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {items.map((it, i) => (
          <button
            key={it.id}
            onClick={e => {
              e.stopPropagation();
              onNavigate(i);
            }}
            style={{
              flexShrink: 0,
              width: 48,
              height: 48,
              borderRadius: 8,
              overflow: 'hidden',
              border: i === currentIndex ? '2px solid #f59e0b' : '2px solid transparent',
              opacity: i === currentIndex ? 1 : 0.45,
              cursor: 'pointer',
              padding: 0,
              background: '#1e293b',
              transition: 'opacity 0.2s, border-color 0.2s',
            }}
          >
            {it.media_type === 'video' ? (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 14,
                }}
              >
                ▶
              </div>
            ) : (
              <img
                src={it.file_url}
                alt={it.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}

function Btn({ onClick, disabled, children, style }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 34,
        height: 34,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.12)',
        border: 'none',
        cursor: disabled ? 'default' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        opacity: disabled ? 0.3 : 1,
        transition: 'background 0.15s',
        flexShrink: 0,
        ...style,
      }}
      onMouseEnter={e => !disabled && (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
      onMouseLeave={e =>
        (e.currentTarget.style.background = style?.background || 'rgba(255,255,255,0.12)')
      }
    >
      {children}
    </button>
  );
}

function navBtnStyle(side) {
  return {
    position: 'absolute',
    [side]: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    width: 48,
    height: 48,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.15)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    transition: 'background 0.15s',
  };
}
