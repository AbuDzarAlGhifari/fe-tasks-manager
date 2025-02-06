import Modal from '@/components/common/Modal';
import TaskForm from '@/components/features/TaskForm';
import TaskPanel from '@/components/features/TaskPanel';
import UserList from '@/components/features/UserList';
import { AuthContext } from '@/contexts/AuthContext';
import { getAdminTasks } from '@/services/tasks';
import { deleteUser, getUsers, promoteUser } from '@/services/user';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

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
    <div className="min-h-screen bg-gray-50 p-6 space-y-4">
      <UserList
        users={users}
        selectedUser={selectedUser}
        onUserSelect={setSelectedUser}
        onPromote={handlePromote}
        onDelete={handleDeleteUser}
      />

      <div>
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
