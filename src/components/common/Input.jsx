import React from 'react';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
}) => (
  <div className="flex flex-col mb-4">
    {label && (
      <label className="mb-1 font-mono font-medium text-green-400">
        {label}
      </label>
    )}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-green-500 rounded px-4 py-2 bg-gray-700 text-green-400 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-150 ${className}`}
    />
  </div>
);

export default Input;
