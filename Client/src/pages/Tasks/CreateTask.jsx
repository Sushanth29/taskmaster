import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const CreateTask = ({ onClose }) => {
  const [task, setTask] = useState('');
  const [userStory, setUserStory] = useState('');
  const [status, setStatus] = useState('New');
  const [userStories, setUserStories] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5001/get-assigned-user-stories')
      .then((response) => {
        setUserStories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user stories: ', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user_id = Cookies.get('userId');
    axios
      .post('http://localhost:5001/create-task', { task, userStory, user_id, status })
      .then((res) => {
        alert('Task created successfully');
        onClose(); 
      })
      .catch((err) => {
        console.error('Error creating task: ', err);
      });
  };

  return (
      <form className="card animated fadeIn w-100 p-3" style={{ width: '700px', margin: 'auto' }}>
        <div className="card-body" style={{ width: '700px', margin: 'auto' }}>
          <h4
            className="title"
            style={{
              fontSize: '24px',
              fontWeight: 600,
              margin: '10px 0px',
              color: '#f44336',
              textAlign: 'center',
            }}
          >
            Create a Task
          </h4>
          <hr />
          <div className="col-md-12 p-2">
            <label className="form-label">Select User Story</label>
            <select
              className="form-select form-control"
              value={userStory}
              onChange={(e) => setUserStory(e.target.value)}
            >
              <option value=''>Select User Story</option>
              {userStories.map((story) => (
                <option key={story._id} value={story._id}>
                  {story.userStoryTitle}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-12 p-2">
            <label className="form-label">Task</label>
            <textarea
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter Task"
              className="form-control"
              type="text"
            />
          </div>
          <div className="col-md-12 p-2">
            <label className="form-label">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-select form-control"
            >
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Awaiting Confirmation">Awaiting Confirmation</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="mt-2 p-2 d-flex align-items-end justify-content-end">
            <button
              type="submit"
              className="btn p-2 btn-primary w-full"
              onClick={handleSubmit}
            >
              Create Task
            </button>
          </div>
        </div>
      </form>
  );
};

export default CreateTask;
