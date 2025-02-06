import { getGroupMembers, getGroupTasks } from '@/services/groups';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import MemberSection from './_component/MemberSection';
import TaskSection from './_component/TaskSection';

const GroupDetails = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);

  const fetchGroupDetails = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const tasksData = await getGroupTasks(token, id);
      setTasks(tasksData);
      const membersData = await getGroupMembers(token, id);
      setMembers(membersData);
    } catch (error) {
      toast.error('Failed to fetch group details');
    }
  }, [id]);

  useEffect(() => {
    fetchGroupDetails();
  }, [fetchGroupDetails]);

  return (
    <div className="p-2 sm:p-6 min-h-screen bg-gray-50">
      <div className="bg-white p-3 sm:p-6 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Group Details</h1>
        <TaskSection
          tasks={tasks}
          groupId={id}
          onTaskChange={fetchGroupDetails}
        />
        <hr className="py-2" />

        <MemberSection
          members={members}
          groupId={id}
          onMemberChange={fetchGroupDetails}
        />
      </div>
    </div>
  );
};

export default GroupDetails;
