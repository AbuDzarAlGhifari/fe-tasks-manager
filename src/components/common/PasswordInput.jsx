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
    <div className="relative flex flex-col mb-4">
      {label && (
        <label className="mb-1 font-medium text-gray-700">{label}</label>
      )}
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      />
      <div
        className="absolute inset-y-0 right-3 flex top-7 items-center cursor-pointer"
        onClick={toggleShowPassword}
      >
        {showPassword ? (
          <FiEyeOff size={20} className="text-gray-500" />
        ) : (
          <FiEye size={20} className="text-gray-500" />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
