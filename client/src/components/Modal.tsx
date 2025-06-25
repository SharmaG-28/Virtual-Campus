import React, { useEffect, useRef } from 'react';
import { RxCross2 } from "react-icons/rx";
interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/5 flex justify-center items-center z-50 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="bg-[#EDF4FF] max-w-[90%] max-h-[90%] overflow-auto rounded-lg w-full relative"
        style={{
          scrollbarWidth: 'none',
        }}
      >
        <button 
          className="fixed z-51 top-12 right-6 bg-red-500 text-white text-lg rounded-full w-9 h-9 flex items-center justify-center hover:bg-red-600 cursor-pointer"
          onClick={onClose} 
          aria-label="Close"
        >
          <RxCross2 />
        </button>
        <div className="">
          {children}
        </div>
      </div>
    </div>
  );
}