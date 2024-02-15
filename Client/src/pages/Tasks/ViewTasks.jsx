import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import AppLayout from '../AppLayout';
import CreateTask from './CreateTask';

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [userStories, setUserStories] = useState({});
  const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      const user_id = Cookies.get('userId');
      const response = await axios.get(`http://localhost:5001/get-user-tasks/${user_id}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks: ', error);
    }
  };

  useEffect(() => {

    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchUserNames = async () => {
      const userNamesMap = {};
      await Promise.all(
        tasks.map(async (task) => {
          const userId = task.created_by;
          const userName = await getUserName(userId);
          userNamesMap[userId] = userName;
        })
      );
      setUserNames(userNamesMap);
    };

    fetchUserNames();
  }, [tasks]);

  useEffect(() => {
    const fetchUserStories = async () => {
      const userStoriesMap = {};
      await Promise.all(
        tasks.map(async (task) => {
          const userStoryId = task.user_story_id;
          const userStory = await getUserStory(userStoryId);
          userStoriesMap[userStoryId] = userStory;
        })
      );
      setUserStories(userStoriesMap);
    };

    fetchUserStories();
  }, [tasks]);

  const handleStatusChange = (taskId, newStatus) => {
    axios
      .patch(`http://localhost:5001/update-status/${taskId}`, { status: newStatus })
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, status: newStatus } : task
          )
        );
      })
      .catch((error) => {
        console.error('Error updating the status: ', error);
      });
  };

  const getUserName = async (userId) => {
    try {
      const userResponse = await axios.get(`http://localhost:5001/get-users/${userId}`);
      return userResponse.data.username;
    } catch (error) {
      console.error('Error fetching user name: ', error);
      return 'Unknown User';
    }
  };

  const getUserStory = async (userStoryId) => {
    try {
      const userStoryResponse = await axios.get(`http://localhost:5001/get--user-story/${userStoryId}`);
      return userStoryResponse.data.userStoryTitle;
    } catch (error) {
      console.error('Error fetching user story: ', error);
      return 'Unknown User';
    }
  };

  const openCreateTaskModal = () => {
    setCreateTaskModalOpen(true);
  };

  const closeCreateTaskModal = () => {
    setCreateTaskModalOpen(false);
    // After creating a new task, refresh the list of tasks
    fetchTasks();
  };

  return (
    <AppLayout>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div className="card animated fadeIn p-3" style={{ margin: '10px 50px 10px 50px', width: '80%' }}>
          <div className="d-flex justify-content-between mb-3">
            <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#f44336' }}>View Tasks</h1>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={openCreateTaskModal}
            >
              Create Task
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Task</th>
                <th style={tableHeaderStyle}>User Story</th>
                <th style={tableHeaderStyle}>Created By</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} style={tableRowStyle}>
                  <td style={tableCellStyle}>{task.task}</td>
                  <td style={tableCellStyle}>{userStories[task.user_story_id]}</td>
                  <td style={tableCellStyle}>{userNames[task.created_by]}</td>
                  <td style={tableCellStyle}>
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                      style={selectStyle}
                    >
                      <option value='New'>New</option>
                      <option value='In Progress'>In Progress</option>
                      <option value='Awaiting Confirmation'>Awaiting Confirmation</option>
                      <option value='Completed'>Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Create Task Modal */}
        {isCreateTaskModalOpen && (
          <div className="position-fixed top-50 start-50 translate-middle">
            <CreateTask onClose={closeCreateTaskModal} />
          </div>
        )}
      </div>
    </AppLayout>
  );
};

const tableHeaderStyle = {
  padding: '12px',
  borderBottom: '2px solid #f44336',
  background: '#f2f2f2',
  textAlign: 'left',
};

const tableRowStyle = {
  borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '12px',
};

const selectStyle = {
  padding: '8px',
  borderRadius: '4px',
};

export default ViewTasks;
