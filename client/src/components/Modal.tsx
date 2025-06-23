import React, { useEffect, useRef } from 'react';
import './Modal.css';

interface ModalProps {
  children: React.ReactNode;
  title?: string;
  onClose: () => void;
}

export default function Modal({ children, title, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Debug logging
  console.log('Modal component rendered with props:', { title, hasChildren: !!children });

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        console.log('ESC key pressed, closing modal');
        onClose();
      }
    };

    console.log('Setting up ESC key listener');
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      console.log('Cleaning up ESC key listener');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        console.log('Click outside modal detected, closing modal');
        onClose();
      }
    };

    console.log('Setting up click outside listener');
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      console.log('Cleaning up click outside listener');
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Debug render
  console.log('Modal rendering with title:', title);

  return (
    <div 
      className="modal-overlay"
      style={{
        // Inline styles to ensure visibility even if CSS fails
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
    >
      <div 
        className="modal-content" 
        ref={modalRef}
        style={{
          // Inline styles to ensure visibility even if CSS fails
          backgroundColor: '#1a1a1a',
          padding: '2rem',
          borderRadius: '8px',
          width: '80%',
          maxWidth: '800px',
          maxHeight: '80vh',
          overflow: 'auto',
          position: 'relative',
          color: '#f0f0f0'
        }}
      >
        {title && (
          <h2 
            className="modal-title"
            style={{
              marginTop: 0,
              marginBottom: '1.5rem',
              color: '#ffffff',
              fontSize: '1.5rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid #333'
            }}
          >
            {title}
          </h2>
        )}
        <button 
          className="modal-close" 
          onClick={() => {
            console.log('Close button clicked');
            onClose();
          }} 
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#999',
            width: '2rem',
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%'
          }}
        >
          ×
        </button>
        <div style={{ marginTop: '1rem' }}>
          {children}
        </div>
        
        {/* Debug info */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          fontSize: '10px',
          color: '#666',
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: '5px',
          borderRadius: '3px'
        }}>
          Modal Debug: {title || 'No title'} | Children: {children ? 'Present' : 'None'}
        </div>
      </div>
    </div>
  );
}