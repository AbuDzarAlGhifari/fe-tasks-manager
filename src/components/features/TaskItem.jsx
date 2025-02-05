import { useState } from 'react';
import { FaEdit, FaInfoCircle, FaTrash } from 'react-icons/fa';
import { HiStatusOnline } from 'react-icons/hi';
import Modal from '../common/Modal';

const TaskItem = ({ task, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const statusStyles = {
    'To Do': {
      border: 'border-gray-300',
      statusBg: 'bg-gray-100 text-gray-800',
    },
    'In Progress': {
      border: 'border-yellow-300',
      statusBg: 'bg-yellow-100 text-yellow-800',
    },
    Completed: {
      border: 'border-green-300',
      statusBg: 'bg-green-100 text-green-800',
    },
  };

  const { border, statusBg } = statusStyles[task.status] || {
    border: 'border-gray-300',
    statusBg: 'bg-gray-100 text-gray-800',
  };

  return (
    <>
      <div
        className={`group p-6 bg-white rounded-xl border-l-4 ${border} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {task.title}
            </h3>
          </div>
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(task)}
              className="rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Edit task"
            >
              <FaEdit className="w-5 h-5 text-blue-500" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Delete task"
            >
              <FaTrash className="w-5 h-5 text-red-500" />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-md hover:bg-gray-100 transition-colors"
            >
              <FaInfoCircle className="w-5 h-5 text-indigo-500" />
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusBg}`}
          >
            {task.status}
          </div>
          <HiStatusOnline className="text-gray-400 animate-pulse" />
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-3 text-gray-800">
              {task.title}
            </h2>
            <p className="text-gray-700">{task.description}</p>
            <div className="mt-4">
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
