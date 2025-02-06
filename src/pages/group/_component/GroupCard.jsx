import React from 'react';

const GroupCard = ({ group, onClick }) => {
  return (
    <div
      onClick={() => onClick(group.id)}
      className="relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900">{group.name}</h2>
        <p className="mt-2 text-gray-600">{group.description}</p>
      </div>
    </div>
  );
};

export default GroupCard;
