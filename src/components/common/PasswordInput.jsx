import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const PasswordInput = ({
  label,
  value,
  onChange,
  placeholder,
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col mb-4 relative">
      {label && (
        <label className="mb-1 font-mono font-medium text-green-400">
          {label}
        </label>
      )}
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border border-green-500 rounded px-4 py-2 bg-gray-700 text-green-400 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-150 w-full ${className}`}
      />
      <div
        className="absolute inset-y-0 right-3 top-7 flex items-center cursor-pointer"
        onClick={toggleShowPassword}
      >
        {showPassword ? (
          <FiEyeOff size={20} className="text-green-400" />
        ) : (
          <FiEye size={20} className="text-green-400" />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
