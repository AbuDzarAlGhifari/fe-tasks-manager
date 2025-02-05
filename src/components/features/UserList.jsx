import React from 'react';

const UserList = ({
  users,
  selectedUser,
  onUserSelect,
  onPromote,
  onDelete,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Users</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => onUserSelect(user)}
            className={`cursor-pointer p-3 rounded mb-2 flex justify-between items-center 
              ${
                selectedUser?.id === user.id
                  ? 'bg-blue-100'
                  : 'bg-white hover:bg-gray-100'
              }
              transition-all duration-200 border border-gray-200`}
          >
            <div className="flex items-center gap-2">
              <span className="font-sans text-gray-800">{user.username}</span>
              {user.role === 'user' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPromote(user, e);
                  }}
                  className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded font-bold"
                >
                  Promote
                </button>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(user, e);
              }}
              className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-bold"
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
