import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-60"
        onClick={onClose}
      ></div>
      {/* Kontainer Modal */}
      <div className="bg-gray-900 rounded-lg shadow-2xl z-50 p-6 w-full max-w-lg relative border border-green-500">
        <button
          className="absolute top-2 right-2 text-green-400 hover:text-green-300 text-2xl leading-none"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
