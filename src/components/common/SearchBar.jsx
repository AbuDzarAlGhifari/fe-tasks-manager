import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="search" className="font-medium text-gray-700">
        Search:
      </label>
      <input
        id="search"
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks..."
        className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 w-full sm:w-fit text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default SearchBar;
