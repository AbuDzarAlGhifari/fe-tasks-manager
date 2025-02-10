import React from 'react';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import SearchBar from '../common/SearchBar';

const TaskPanel = ({
  selectedUser,
  tasks,
  selectedStatus,
  onStatusChange,
  onEdit,
  searchQuery,
  onSearchChange,
}) => {
  const filteredTasks =
    selectedUser && tasks.length > 0
      ? tasks.filter((task) => {
          const matchesUser = task.user_id === selectedUser.id;
          const matchesStatus =
            selectedStatus === 'All' ? true : task.status === selectedStatus;
          const searchLower = searchQuery.toLowerCase();
          const matchesSearch =
            searchQuery.trim() === '' ||
            task.title.toLowerCase().includes(searchLower) ||
            task.description.toLowerCase().includes(searchLower);
          return matchesUser && matchesStatus && matchesSearch;
        })
      : [];

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
      {selectedUser ? (
        <>
          <h1 className="text-3xl font-bold mb-4 text-gray-800 capitalize">
            {selectedUser.username}&apos;s Tasks
          </h1>

          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <TaskFilter
              selectedStatus={selectedStatus}
              onStatusChange={onStatusChange}
            />
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
            />
          </div>

          {filteredTasks.length > 0 ? (
            <TaskList tasks={filteredTasks} onEdit={onEdit} />
          ) : (
            <p className="text-center text-gray-500 italic">
              No tasks available for {selectedUser.username} with status &apos;
              {selectedStatus}&apos;
            </p>
          )}
        </>
      ) : (
        <h1 className="text-2xl font-bold text-center text-gray-500">
          Select a user to view tasks
        </h1>
      )}
    </div>
  );
};

export default TaskPanel;
