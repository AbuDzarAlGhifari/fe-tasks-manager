import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import { addMemberToGroup } from '@/services/groups';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const MemberSection = ({ members, groupId, onMemberChange }) => {
  const [modalMemberOpen, setModalMemberOpen] = useState(false);
  const [memberData, setMemberData] = useState({
    userId: '',
    role: 'member',
  });

  const handleMemberInputChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await addMemberToGroup(token, groupId, {
        userId: parseInt(memberData.userId, 10),
        role: memberData.role,
      });
      toast.success('Member added successfully');
      setModalMemberOpen(false);
      setMemberData({ userId: '', role: 'member' });
      onMemberChange();
    } catch (error) {
      toast.error('Failed to add member');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Members</h2>
        <button
          onClick={() => setModalMemberOpen(true)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded transition duration-150 font-sans"
        >
          Add Member
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.length > 0 ? (
          members.map((member) => (
            <div
              key={member.id}
              className="relative bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900">
                {member.username || member.name}
              </h3>
              <p className="mt-2 text-gray-600">
                Role: <span className="font-medium">{member.role}</span>
              </p>
              {member.joined_at && (
                <p className="mt-2 text-sm text-gray-500">
                  Joined: {new Date(member.joined_at).toLocaleString()}
                </p>
              )}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
            </div>
          ))
        ) : (
          <p className="text-gray-600">No members in this group</p>
        )}
      </div>
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

export default MemberSection;
