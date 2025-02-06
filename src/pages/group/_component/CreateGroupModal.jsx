import React, { useState } from 'react';

const CreateGroupModal = ({ onSubmit, onClose }) => {
  const [groupData, setGroupData] = useState({ name: '', description: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGroupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(groupData, () => setGroupData({ name: '', description: '' }));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Create Group</h2>
      <form onSubmit={handleSubmit}>
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
  );
};

export default CreateGroupModal;
