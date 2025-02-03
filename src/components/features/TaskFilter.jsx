import React from 'react';

const TaskFilter = ({ selectedStatus, onStatusChange }) => {
  return (
    <div className=" flex items-center space-x-3">
      <label htmlFor="statusFilter" className="font-medium text-green-300">
        Filter by Status:
      </label>
      <select
        id="statusFilter"
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="border border-green-500 bg-gray-800 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
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
