import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppLayout from '../AppLayout';
import { useParams } from 'react-router-dom';

const TaskDetails = () => {
  const [tasks, setTasks] = useState([]);
  const { task } = useParams(); 

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/get-task/${task}`);
        const taskData = response.data[0];
        setTasks(taskData);
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    fetchTaskDetails();
  }, [task]);

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
              Task Details
            </h4>
            {tasks ? (
              <div>
                <p>Task Title: {tasks.task}</p>
                <p>Task Status: {tasks.status}</p>
              </div>
            ) : (
              <p>Loading task details...</p>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TaskDetails;
