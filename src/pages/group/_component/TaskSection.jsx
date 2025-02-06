import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import TaskList from '@/components/features/TaskList';
import Textarea from '@/components/common/Textarea';
import Input from '@/components/common/Input';
import { API_URL } from '@/utils/constants';

const TaskSection = ({ tasks, groupId, onTaskChange }) => {
  const [modalTaskOpen, setModalTaskOpen] = useState(false);
  const [groupTaskData, setGroupTaskData] = useState({
    title: '',
    description: '',
    status: 'To Do',
  });

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setGroupTaskData((prev) => ({ ...prev, [name]: value }));
  };

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
          group_id: parseInt(groupId, 10),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || 'Group task created');
        setModalTaskOpen(false);
        setGroupTaskData({ title: '', description: '', status: 'To Do' });
        onTaskChange();
      } else {
        toast.error(data.message || 'Failed to create group task');
      }
    } catch (error) {
      toast.error('Failed to create group task');
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Tasks</h2>
        <button
          onClick={() => setModalTaskOpen(true)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded transition duration-150 font-sans"
        >
          Create Group Task
        </button>
      </div>
      <div className="mt-6">
        {tasks.length > 0 ? (
          <TaskList tasks={tasks} onEdit={() => {}} onDelete={() => {}} />
        ) : (
          <p className="text-gray-600">No tasks available for this group</p>
        )}
      </div>
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
    </div>
  );
};

export default TaskSection;
