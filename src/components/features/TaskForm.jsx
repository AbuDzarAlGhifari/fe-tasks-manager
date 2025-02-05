import React, { useState } from 'react';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import { toast } from 'react-hot-toast';
import { createTask, updateTask } from '../../services/tasks';

const TaskForm = ({ task, onSuccess }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState(task?.status || 'To Do');
  const isEditMode = Boolean(task);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { title, description, status };
      if (isEditMode) {
        await updateTask(task.id, payload);
        toast.success('Task updated');
      } else {
        await createTask(payload);
        toast.success('Task created');
      }
      onSuccess();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-xl border border-gray-200"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {isEditMode ? 'Update Task' : 'Create Task'}
      </h2>
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="bg-gray-50 text-gray-900"
      />
      <Textarea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        className="bg-gray-50 text-gray-900"
      />
      <div className="flex flex-col mb-4">
        <label className="mb-1 font-medium text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <Button type="submit">{isEditMode ? 'Update' : 'Create'}</Button>
    </form>
  );
};

export default TaskForm;
