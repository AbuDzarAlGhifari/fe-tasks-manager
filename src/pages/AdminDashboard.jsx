import React, { useEffect, useState, useContext } from 'react';
import { getAdminTasks } from '../services/tasks';
import { getUsers, promoteUser, deleteUser } from '../services/user';
import { AuthContext } from '../contexts/AuthContext';
import TaskPanel from '../components/features/TaskPanel';
import Modal from '../components/common/Modal';
import TaskForm from '../components/features/TaskForm';
import { toast } from 'react-hot-toast';
import UserList from '../components/features/UserList';

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getAdminTasks();
      setTasks(data);
    } catch {
      toast.error('Failed to fetch admin tasks');
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch {
      toast.error('Failed to fetch users');
    }
  };

  const handlePromote = async (user, e) => {
    e.stopPropagation();
    try {
      await promoteUser(user.id);
      toast.success(`${user.username} promoted to admin`);
      fetchUsers();
    } catch {
      toast.error('Failed to promote user');
    }
  };

  const handleDeleteUser = async (user, e) => {
    e.stopPropagation();
    try {
      const response = await deleteUser(user.id);
      toast.success(response.message);
      fetchUsers();
      if (selectedUser?.id === user.id) setSelectedUser(null);
    } catch {
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Sidebar User List */}
      <UserList
        users={users}
        selectedUser={selectedUser}
        onUserSelect={setSelectedUser}
        onPromote={handlePromote}
        onDelete={handleDeleteUser}
      />

      {/* Main Task Panel */}
      <div className="md:col-span-3">
        <TaskPanel
          selectedUser={selectedUser}
          tasks={tasks}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          onEdit={(task) => {
            setEditingTask(task);
            setModalOpen(true);
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Modal untuk Form Task */}
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <TaskForm
            task={editingTask}
            onSuccess={() => {
              setModalOpen(false);
              fetchTasks();
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default AdminDashboard;
