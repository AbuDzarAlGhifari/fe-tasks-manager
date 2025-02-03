import React from 'react';

const Textarea = ({ label, value, onChange, placeholder, className = '' }) => (
  <div className="flex flex-col mb-4">
    {label && <label className="mb-1 font-medium text-gray-700">{label}</label>}
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ${className}`}
      rows="4"
    ></textarea>
  </div>
);

export default Textarea;
