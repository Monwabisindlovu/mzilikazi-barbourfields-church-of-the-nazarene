import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

export default function MediaLightbox({ items, currentIndex, onClose, onNavigate }) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const isPinching = useRef(false);
  const touchStartDist = useRef(0);
  const touchStartZoom = useRef(1);
  const lastTouchX = useRef(null);
  const lastClick = useRef(0);

  const item = items[currentIndex];
  const isImage = item?.media_type !== 'video';

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  /* ================= RESET ================= */
  useEffect(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, [currentIndex]);

  /* ================= LOCK SCROLL ================= */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = '');
  }, []);

  /* ================= SAFE ZOOM CLAMP ================= */
  const clampZoom = z => Math.min(Math.max(z, 1), 3);

  useEffect(() => {
    if (zoom === 1) setOffset({ x: 0, y: 0 });
  }, [zoom]);

  /* ================= DOWNLOAD ================= */
  const handleDownload = async e => {
    e.stopPropagation();
    try {
      const res = await fetch(item.file_url);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = item.title || 'media';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    } catch {
      window.open(item.file_url, '_blank');
    }
  };

  /* ================= DESKTOP DRAG ================= */
  const onMouseDown = e => {
    if (zoom <= 1) return;
    setDragging(true);
    dragStart.current = {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    };
  };

  const onMouseMove = e => {
    if (!dragging) return;
    setOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const onMouseUp = () => setDragging(false);

  /* ================= DOUBLE CLICK ZOOM (FIXED) ================= */
  const handleDoubleClick = () => {
    const now = Date.now();

    if (now - lastClick.current < 250) {
      setZoom(z => {
        const next = z > 1 ? 1 : 1.8; // controlled zoom
        return next;
      });

      setOffset({ x: 0, y: 0 });
    }

    lastClick.current = now;
  };

  /* ================= TOUCH HELPERS ================= */
  const getDistance = (t1, t2) => {
    const dx = t2.clientX - t1.clientX;
    const dy = t2.clientY - t1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const onTouchStart = e => {
    if (e.touches.length === 1) {
      lastTouchX.current = e.touches[0].clientX;

      setDragging(true);
      dragStart.current = {
        x: e.touches[0].clientX - offset.x,
        y: e.touches[0].clientY - offset.y,
      };
    }

    if (e.touches.length === 2) {
      isPinching.current = true;
      touchStartDist.current = getDistance(e.touches[0], e.touches[1]);
      touchStartZoom.current = zoom;
    }
  };

  const onTouchMove = e => {
    if (e.touches.length === 1 && !isPinching.current) {
      if (zoom > 1) {
        setOffset({
          x: e.touches[0].clientX - dragStart.current.x,
          y: e.touches[0].clientY - dragStart.current.y,
        });
      }
    }

    if (e.touches.length === 2) {
      const newDist = getDistance(e.touches[0], e.touches[1]);
      const scale = newDist / touchStartDist.current;

      setZoom(clampZoom(touchStartZoom.current * scale));
    }
  };

  const onTouchEnd = e => {
    setDragging(false);
    isPinching.current = false;

    if (lastTouchX.current && zoom === 1) {
      const endX = e.changedTouches?.[0]?.clientX || 0;
      const delta = lastTouchX.current - endX;

      if (Math.abs(delta) > 60) {
        if (delta > 0 && hasNext) onNavigate(currentIndex + 1);
        if (delta < 0 && hasPrev) onNavigate(currentIndex - 1);
      }
    }

    lastTouchX.current = null;
  };

  if (!item) return null;

  return createPortal(
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
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* TOP BAR */}
      <div style={topBar}>
        <div>
          <div style={{ fontWeight: 600 }}>{item.title}</div>
          <div style={{ fontSize: 12, opacity: 0.6 }}>
            {currentIndex + 1} / {items.length}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {isImage && (
            <button onClick={handleDownload} style={iconBtn}>
              <Download size={18} />
            </button>
          )}

          <button onClick={onClose} style={iconBtn}>
            <X />
          </button>
        </div>
      </div>

      {/* NAV */}
      {hasPrev && (
        <button onClick={() => onNavigate(currentIndex - 1)} style={navBtn('left')}>
          <ChevronLeft />
        </button>
      )}

      {hasNext && (
        <button onClick={() => onNavigate(currentIndex + 1)} style={navBtn('right')}>
          <ChevronRight />
        </button>
      )}

      {/* MEDIA */}
      <div style={center} onClick={handleDoubleClick}>
        <AnimatePresence mode="wait">
          <motion.div key={item._id || currentIndex}>
            {isImage ? (
              <img
                src={item.file_url}
                onMouseDown={onMouseDown}
                draggable={false}
                style={{
                  maxWidth: '90vw',
                  maxHeight: '85vh',
                  transform: `scale(${zoom}) translate(${offset.x / zoom}px, ${offset.y / zoom}px)`,
                  cursor: zoom > 1 ? 'grab' : 'default',
                  touchAction: zoom > 1 ? 'none' : 'manipulation',
                }}
              />
            ) : (
              <video
                src={item.file_url}
                controls
                autoPlay
                style={{ maxWidth: '90vw', maxHeight: '85vh' }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>,
    document.body
  );
}

/* ================= STYLES ================= */
const iconBtn = {
  background: 'rgba(255,255,255,0.12)',
  border: 'none',
  color: '#fff',
  padding: 8,
  borderRadius: 8,
  cursor: 'pointer',
};

const topBar = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: 12,
  color: '#fff',
};

const center = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function navBtn(side) {
  return {
    position: 'absolute',
    top: '50%',
    [side]: 10,
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    color: '#fff',
    padding: 10,
    borderRadius: 50,
    cursor: 'pointer',
  };
}
