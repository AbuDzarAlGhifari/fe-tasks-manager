import { useState } from 'react';
import { FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';
import { HiStatusOnline } from 'react-icons/hi';
import Modal from '../common/Modal';

const TaskItem = ({ task, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const statusStyles = {
    'To Do': {
      border: 'border-gray-500',
      statusBg: 'bg-gray-700 text-gray-300',
    },
    'In Progress': {
      border: 'border-yellow-500',
      statusBg: 'bg-yellow-700 text-yellow-300',
    },
    Completed: {
      border: 'border-green-500',
      statusBg: 'bg-green-700 text-green-300',
    },
  };

  const { border, statusBg } = statusStyles[task.status] || {
    border: 'border-gray-500',
    statusBg: 'bg-gray-700 text-gray-300',
  };

  return (
    <>
      <div
        className={`group p-6 bg-gray-800 rounded-xl border-l-4 ${border} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 shadow-md`}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-100 mb-2 font-mono">
              {task.title}
            </h3>
          </div>
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(task)}
              className="rounded-lg hover:bg-gray-700 transition-colors"
              aria-label="Edit task"
            >
              <FaEdit className="w-5 h-5 text-blue-400" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="rounded-lg hover:bg-gray-700 transition-colors"
              aria-label="Delete task"
            >
              <FaTrash className="w-5 h-5 text-red-400" />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FaInfoCircle className="w-5 h-5 text-green-400" />
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
            <h2 className="text-2xl font-bold mb-3 text-gray-100">
              {task.title}
            </h2>
            <p className="text-gray-300">{task.description}</p>
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
