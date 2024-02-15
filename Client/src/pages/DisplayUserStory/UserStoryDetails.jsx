import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppLayout from '../AppLayout';
import { useParams } from 'react-router-dom';

const UserStoryDetails = () => {
  const [userStory, setUserStory] = useState({});
  const { userStoryTitle} = useParams(); 

  useEffect(() => {
    const fetchUserStoryDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/get-user-story/${userStoryTitle}`);
        setUserStory(response.data[0]);
       // console.log(userStory)
      } catch (error) {
        console.error('Error fetching user story details:', error);
      }
    };

    fetchUserStoryDetails();
  }, [userStoryTitle]);

  return (
    <AppLayout>
      <div className="row justify-content-center">
        <div className="col-md-4 col-lg-8 center-screen">
          <div className="card animated fadeIn p-3" style={{ margin: '10px 50px 10px 50px' }}>
            <h4
              style={{
                fontSize: '24px',
                fontWeight: 600,
                margin: '10px 0px',
                color: '#f44336',
              }}
            >
              User Story Details
            </h4>
            {userStory ? (
              <div>
                <p>Project Name: {userStory.projectName}</p>
                <p>User Story Title: {userStory.userStoryTitle}</p>
                <p>User Story Description: {userStory.userStoryDescription}</p>
                <p>User Story Priority: {userStory.userStoryPriority}</p>
              </div>
            ) : (
              <p>Loading user story details...</p>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default UserStoryDetails;
