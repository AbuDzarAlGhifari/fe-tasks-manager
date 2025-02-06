import Modal from '@/components/common/Modal';
import { createGroup, getJoinedGroups } from '@/services/groups';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import CreateGroupModal from './_component/CreateGroupModal';
import GroupCard from './_component/GroupCard';

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const getToken = useCallback(() => localStorage.getItem('token'), []);

  const fetchGroups = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) throw new Error('Token tidak ditemukan');
      const data = await getJoinedGroups(token);
      setGroups(data);
    } catch (error) {
      console.error('Error fetching groups:', error);
      toast.error('Failed to fetch joined groups');
    }
  }, [getToken]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleGroupClick = (groupId) => {
    navigate(`/groups/${groupId}`);
  };

  const handleCreateGroup = async (groupData, resetForm) => {
    try {
      const token = getToken();
      if (!token) throw new Error('Token tidak ditemukan');
      await createGroup(token, groupData);
      toast.success('Group created successfully');
      setIsModalOpen(false);
      resetForm();
      fetchGroups();
    } catch (error) {
      console.error('Error creating group:', error);
      toast.error('Failed to create group');
    }
  };

  return (
    <div className="p-2 sm:p-6 min-h-screen bg-gray-50">
      <div className="bg-white p-3 sm:p-6 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Groups</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-6 px-4 py-2 bg-blue-500 cursor-pointer w-full sm:w-fit hover:bg-blue-600 text-white rounded transition duration-150"
        >
          Create Group
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onClick={handleGroupClick}
            />
          ))}
        </div>
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <CreateGroupModal
              onSubmit={handleCreateGroup}
              onClose={() => setIsModalOpen(false)}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Groups;
