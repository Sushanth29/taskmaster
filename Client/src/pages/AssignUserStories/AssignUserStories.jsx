import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import AppLayout from '../AppLayout';

const AssignUserStories = () => {
  const [unassignedUserStories, setUnassignedUserStories] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5001/get-unassigned-user-stories')
      .then((response) => {
        setUnassignedUserStories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching unassigned user stories: ', error);
      });
  }, []);

  const assignUserStory = (userStoryId) => {
    const userId = Cookies.get('userId');
    axios
      .post('http://localhost:5001/assign-user-story', { user_story_id: userStoryId, user_id: userId })
      .then(() => {
        setUnassignedUserStories(unassignedUserStories.filter((story) => story._id !== userStoryId));
      })
      .catch((error) => {
        console.error('Error assigning user story: ', error);
      });
  };

  return (
    <AppLayout>
      <div className="row justify-content-center align-items-start">
        <div className="col-md-4 col-lg-8 center-screen">
          <div
            className="card animated fadeIn p-3"
            style={{ margin: '10px 50px 10px 50px' }}
          >
            <div className="d-flex justify-content-between mb-3">
              <h4
                style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  margin: '10px 0px',
                  color: '#f44336',
                }}
              >
                Assign User Stories
              </h4>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {unassignedUserStories.map((story) => (
                  <tr key={story._id}>
                    <td>{story.userStoryTitle}</td>
                    <td>{story.userStoryDescription}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => assignUserStory(story._id)}
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AssignUserStories;
