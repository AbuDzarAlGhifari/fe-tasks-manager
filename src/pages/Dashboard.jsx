import Modal from '@/components/common/Modal';
import SearchBar from '@/components/common/SearchBar';
import TaskFilter from '@/components/features/TaskFilter';
import TaskForm from '@/components/features/TaskForm';
import TaskList from '@/components/features/TaskList';
import { deleteTask, getTasks } from '@/services/tasks';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      toast.success('Task deleted');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleFormSuccess = () => {
    setModalOpen(false);
    setEditingTask(null);
    fetchTasks();
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      selectedStatus === 'All' || task.status === selectedStatus;
    const searchLower = searchQuery.toLowerCase();
    const searchMatch =
      task.title.toLowerCase().includes(searchLower) ||
      task.description.toLowerCase().includes(searchLower);
    return statusMatch && (searchQuery.trim() === '' ? true : searchMatch);
  });

  return (
    <div className="p-2 sm:p-6 min-h-screen bg-gray-50">
      <div className="bg-white p-3 sm:p-6 rounded-lg shadow-lg border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between sm:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold mb-4 md:mb-0 text-gray-800 font-sans">
            Tasks
          </h1>
          <div className="flex flex-col md:flex-row sm:items-center gap-3">
            <TaskFilter
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
            />

            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <button
              onClick={openCreateModal}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-150 font-sans"
            >
              Create Task
            </button>
          </div>
        </div>

        {modalOpen && (
          <Modal onClose={closeModal}>
            <TaskForm task={editingTask} onSuccess={handleFormSuccess} />
          </Modal>
        )}

        {filteredTasks.length > 0 ? (
          <TaskList
            tasks={filteredTasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <p className="text-center text-gray-500 mt-4 font-sans italic">
            No tasks available for status &apos;{selectedStatus}&apos;
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
