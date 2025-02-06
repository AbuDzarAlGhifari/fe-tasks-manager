import { useState } from 'react';
import { FaEdit, FaInfoCircle, FaTrash } from 'react-icons/fa';
import { HiStatusOnline } from 'react-icons/hi';
import Modal from '../common/Modal';

const TaskItem = ({ task, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const statusStyles = {
    'To Do': {
      border: 'border-gray-400',
      statusBg: 'bg-gray-200 text-gray-800',
    },
    'In Progress': {
      border: 'border-yellow-400',
      statusBg: 'bg-yellow-200 text-yellow-800',
    },
    Completed: {
      border: 'border-green-500',
      statusBg: 'bg-green-200 text-green-800',
    },
  };

  const { border, statusBg } = statusStyles[task.status] || {
    border: 'border-gray-400',
    statusBg: 'bg-gray-200 text-gray-800',
  };

  return (
    <>
      <div
        className={`group p-5 bg-white rounded-lg shadow-md border-l-4 ${border} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
      >
        {/* Task Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
          {task.title}
        </h3>

        {/* Task Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onEdit(task)}
            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors duration-200"
            aria-label="Edit task"
          >
            <FaEdit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors duration-200"
            aria-label="Delete task"
          >
            <FaTrash className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-600 transition-colors duration-200"
          >
            <FaInfoCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Task Status */}
        <div className="mt-4 flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusBg}`}
          >
            {task.status}
          </span>
          <HiStatusOnline className="text-gray-400 animate-pulse" />
        </div>
      </div>

      {/* Task Detail Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
            <p className="text-gray-700">{task.description}</p>
            <div className="mt-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${statusBg}`}
              >
                {task.status}
              </span>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default TaskItem;
