import React from 'react';

const TaskFilter = ({ selectedStatus, onStatusChange }) => {
  return (
    <div className="flex items-center space-x-3">
      <label htmlFor="statusFilter" className="font-medium text-gray-700">
        Filter by Status:
      </label>
      <select
        id="statusFilter"
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="border border-gray-300 bg-white text-gray-900 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="All">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default TaskFilter;
