import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '' }) => (
  <button
    type={type}
    onClick={onClick}
    className={`w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-mono rounded shadow-lg transition duration-150 ${className}`}
  >
    {children}
  </button>
);

export default Button;
