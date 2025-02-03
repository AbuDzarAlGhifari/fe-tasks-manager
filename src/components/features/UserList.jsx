import React from 'react';

const UserList = ({
  users,
  selectedUser,
  onUserSelect,
  onPromote,
  onDelete,
}) => {
  return (
    <div className="bg-gray-900 border border-green-500 rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-4 text-green-400 font-mono">
        Users
      </h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => onUserSelect(user)}
            className={`cursor-pointer p-3 rounded mb-2 flex justify-between items-center 
              ${
                selectedUser?.id === user.id
                  ? 'bg-green-700 text-black'
                  : 'bg-gray-800 hover:bg-green-900 text-green-300'
              }
              transition-all duration-200 border border-green-500`}
          >
            <div className="flex items-center gap-2">
              <span className="font-mono">{user.username}</span>
              {user.role === 'user' && (
                <button
                  onClick={(e) => onPromote(user, e)}
                  className="text-xs bg-green-500 hover:bg-green-600 text-black px-3 py-1 rounded font-bold"
                >
                  Promote
                </button>
              )}
            </div>
            <button
              onClick={(e) => onDelete(user, e)}
              className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded font-bold"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
