import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppLayout from '../AppLayout';
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
  const [project, setProject] = useState({});
  const { projectName } = useParams();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/get-project/${projectName}`);
        console.log('Project Details API response:', response.data);
        setProject(response.data[0]);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [projectName]);

  console.log('Project state:', project);

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
              Project Details
            </h4>
            <div>
              <p>Project Name: {project.projectName}</p>
              <p>Project Description: {project.description}</p>
              <p>Product Owner: {project.ownerName}</p>
              <p>Project Manager: {project.managerName}</p>
              <p>Team Name: {project.team}</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectDetails;
