import { useState, useRef, useEffect } from 'react';
import { FiX, FiZoomIn, FiZoomOut, FiMaximize, FiMinimize } from 'react-icons/fi';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './ImageViewer.css';

export default function ImageViewer({ src, alt, onClose }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const viewerRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(() => {
    gsap.from('.image-viewer__backdrop', {
      opacity: 0,
      duration: 0.3,
    });
    gsap.from('.image-viewer__img-container', {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: 'back.out(1.4)',
    });
    
    // Lock scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, { scope: viewerRef });

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => {
    setScale(prev => {
      const newScale = Math.max(prev - 0.5, 1);
      if (newScale === 1) setPosition({ x: 0, y: 0 });
      return newScale;
    });
  };

  const toggleZoom = () => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2);
    }
  };

  const handleMouseDown = (e) => {
    if (scale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Basic boundary checks (optional, can be refined)
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="image-viewer" ref={viewerRef}>
      <div className="image-viewer__backdrop" onClick={onClose} />
      
      <div className="image-viewer__controls">
        <button onClick={handleZoomIn} title="Zoom In"><FiZoomIn /></button>
        <button onClick={handleZoomOut} title="Zoom Out"><FiZoomOut /></button>
        <button onClick={toggleZoom} title={scale > 1 ? "Reset Zoom" : "Quick Zoom"}>
          {scale > 1 ? <FiMinimize /> : <FiMaximize />}
        </button>
        <button className="image-viewer__close" onClick={onClose} title="Close"><FiX /></button>
      </div>

      <div 
        className={`image-viewer__img-container ${isDragging ? 'is-dragging' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in' }}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onClick={(e) => {
            if (scale === 1) toggleZoom();
            e.stopPropagation();
          }}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
          draggable="false"
        />
      </div>
      
      {scale > 1 && (
        <div className="image-viewer__hint">
          Drag to explore
        </div>
      )}
    </div>
  );
}
