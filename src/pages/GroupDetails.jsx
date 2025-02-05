import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getGroupTasks,
  getGroupMembers,
  addMemberToGroup,
} from '../services/groups';
import { API_URL } from '../utils/constants';
import { toast } from 'react-hot-toast';
import Modal from '../components/common/Modal';
import TaskList from '../components/features/TaskList';
import Input from '../components/common/Input';
import Textarea from '../components/common/Textarea';
import Button from '../components/common/Button';

const GroupDetails = () => {
  const { id } = useParams(); // Group ID
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [modalTaskOpen, setModalTaskOpen] = useState(false);
  const [modalMemberOpen, setModalMemberOpen] = useState(false);
  const [groupTaskData, setGroupTaskData] = useState({
    title: '',
    description: '',
    status: 'To Do',
  });
  const [memberData, setMemberData] = useState({
    userId: '',
    role: 'member',
  });

  // Fetch group tasks dan members
  const fetchGroupDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const tasksData = await getGroupTasks(token, id);
      setTasks(tasksData);
      const membersData = await getGroupMembers(token, id);
      setMembers(membersData);
    } catch (error) {
      toast.error('Failed to fetch group details');
    }
  };

  useEffect(() => {
    fetchGroupDetails();
  }, [id]);

  // Handler untuk perubahan input task
  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setGroupTaskData((prev) => ({ ...prev, [name]: value }));
  };

  // Fungsi untuk membuat group task
  const handleCreateGroupTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...groupTaskData,
          group_id: parseInt(id, 10),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || 'Group task created');
        setModalTaskOpen(false);
        setGroupTaskData({ title: '', description: '', status: 'To Do' });
        fetchGroupDetails();
      } else {
        toast.error(data.message || 'Failed to create group task');
      }
    } catch (error) {
      toast.error('Failed to create group task');
    }
  };

  // Handler untuk perubahan input member
  const handleMemberInputChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prev) => ({ ...prev, [name]: value }));
  };

  // Fungsi untuk menambahkan member ke group
  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await addMemberToGroup(token, id, {
        userId: parseInt(memberData.userId, 10),
        role: memberData.role,
      });
      toast.success('Member added successfully');
      setModalMemberOpen(false);
      setMemberData({ userId: '', role: 'member' });
      fetchGroupDetails();
    } catch (error) {
      toast.error('Failed to add member');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Group Details</h1>

      {/* Section Task */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tasks</h2>
        <Button onClick={() => setModalTaskOpen(true)} className="mt-2">
          Create Group Task
        </Button>
        <div className="mt-6">
          {tasks.length > 0 ? (
            <TaskList tasks={tasks} onEdit={() => {}} onDelete={() => {}} />
          ) : (
            <p className="text-gray-600">No tasks available for this group</p>
          )}
        </div>
      </div>

      {/* Section Members */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Members</h2>
        <Button onClick={() => setModalMemberOpen(true)} className="mt-2 mb-6">
          Add Member
        </Button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.length > 0 ? (
            members.map((member) => (
              <div key={member.id} className="p-6 border rounded-lg shadow">
                <h3 className="font-semibold text-gray-800">
                  {member.username || member.name}
                </h3>
                <p className="text-gray-600 mt-1">Role: {member.role}</p>
                {member.joined_at && (
                  <p className="text-gray-500 text-xs mt-1">
                    Joined: {new Date(member.joined_at).toLocaleString()}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600">No members in this group</p>
          )}
        </div>
      </div>

      {/* Modal untuk Create Group Task */}
      {modalTaskOpen && (
        <Modal onClose={() => setModalTaskOpen(false)}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">
              Create Group Task
            </h2>
            <form onSubmit={handleCreateGroupTask}>
              <Input
                label="Title"
                name="title"
                value={groupTaskData.title}
                onChange={handleTaskInputChange}
                placeholder="Task Title"
              />
              <Textarea
                label="Description"
                name="description"
                value={groupTaskData.description}
                onChange={handleTaskInputChange}
                placeholder="Task Description"
              />
              <div className="mb-6">
                <label className="block text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={groupTaskData.status}
                  onChange={handleTaskInputChange}
                  className="w-full border rounded px-3 py-2 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <Button type="submit">Create Task</Button>
            </form>
          </div>
        </Modal>
      )}

      {/* Modal untuk Add Member */}
      {modalMemberOpen && (
        <Modal onClose={() => setModalMemberOpen(false)}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Add Member</h2>
            <form onSubmit={handleAddMember}>
              <Input
                label="User ID"
                name="userId"
                type="number"
                value={memberData.userId}
                onChange={handleMemberInputChange}
                placeholder="Enter user ID"
                required
              />
              <div className="mb-6">
                <label className="block text-gray-700 mb-1">Role</label>
                <select
                  name="role"
                  value={memberData.role}
                  onChange={handleMemberInputChange}
                  className="w-full border rounded px-3 py-2 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="member">Member</option>
                  <option value="owner">Owner</option>
                </select>
              </div>
              <Button type="submit">Add Member</Button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GroupDetails;
