import React from 'react';

const UserList = ({
  users,
  selectedUser,
  onUserSelect,
  onPromote,
  onDelete,
}) => {
  return (
    <section className="bg-white border border-gray-200 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Users</h2>
      <ul className="space-y-3">
        {users.map((user) => {
          const isSelected = selectedUser?.id === user.id;
          return (
            <li
              key={user.id}
              role="button"
              tabIndex={0}
              onClick={() => onUserSelect(user)}
              className={`cursor-pointer flex items-center justify-between p-4 rounded-lg transition-colors duration-200 border border-gray-200 ${
                isSelected ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    {user.username}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">
                    {user.role}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                {user.role === 'user' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPromote(user, e);
                    }}
                    className="px-4 py-1 text-xs font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Promote
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(user, e);
                  }}
                  className="px-4 py-1 text-xs font-semibold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default UserList;
