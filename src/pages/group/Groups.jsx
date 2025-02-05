import React, { useEffect, useState } from 'react';
import { getJoinedGroups, createGroup } from '../../services/groups';
import { toast } from 'react-hot-toast';
import Modal from '../../components/common/Modal';
import { useNavigate } from 'react-router-dom';

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [groupData, setGroupData] = useState({ name: '', description: '' });
  const navigate = useNavigate();

  const fetchGroups = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await getJoinedGroups(token);
      setGroups(data);
    } catch (error) {
      toast.error('Failed to fetch joined groups');
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGroupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await createGroup(token, groupData);
      toast.success('Group created successfully');
      setModalOpen(false);
      setGroupData({ name: '', description: '' });
      fetchGroups();
    } catch (error) {
      toast.error('Failed to create group');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Joined Groups</h1>
      <button
        onClick={() => setModalOpen(true)}
        className="mb-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-150"
      >
        Create Group
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div
            key={group.id}
            className="p-6 border rounded-lg shadow hover:bg-gray-100 cursor-pointer transition-colors"
            onClick={() => navigate(`/groups/${group.id}`)}
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {group.name}
            </h2>
            <p className="text-gray-600 mt-2">{group.description}</p>
          </div>
        ))}
      </div>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">
              Create Group
            </h2>
            <form onSubmit={handleCreateGroup}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Group Name</label>
                <input
                  type="text"
                  name="name"
                  value={groupData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter group name"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={groupData.description}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter group description"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-150"
              >
                Create Group
              </button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Groups;
