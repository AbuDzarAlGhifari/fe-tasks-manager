import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="search" className="font-medium text-green-400 font-mono">
        Search:
      </label>
      <input
        id="search"
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks..."
        className="border border-green-500 rounded px-3 py-2 bg-gray-800 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-600"
      />
    </div>
  );
};

export default SearchBar;
