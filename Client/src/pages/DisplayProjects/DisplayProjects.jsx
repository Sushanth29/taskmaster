import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '../AppLayout';
import ProjectForm from '../../components/ProjectForm';

const DisplayProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isCreateProjectModalOpen, setCreateProjectModalOpen] = useState(false);

  const openCreateProjectModal = () => {
    setCreateProjectModalOpen(true);
  };

  const closeCreateProjectModal = () => {
    fetchProjects();
  };

  const fetchProjects = () => {
    axios
      .get('http://localhost:5001/all-projects')
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <AppLayout>
      <div className="row justify-content-center align-items-start">
        <div
          className="col-md-4 col-lg-8 center-screen card border-0 w-80 py-3"
          style={{ padding: '10px 40px', position: 'relative' }}
        >
          <div
            style={{
              fontSize: '24px',
              fontWeight: 600,
              margin: '10px 0',
              color: '#f44336',
            }}
          >
            Display Projects
          </div>
          <button
            type="button"
            className="btn btn-primary position-absolute top-0 end-0 m-3"
            onClick={openCreateProjectModal}
          >
            Create Project
          </button>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Project Name</th>
                <th scope="col">Description</th>
                <th scope="col">Owner Name</th>
                <th scope="col">Manager Name</th>
                <th scope="col">Team Name</th>
              </tr>
            </thead>
            <tbody>
              {projects?.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.projectName}</td>
                    <td>{item.description}</td>
                    <td>{item.ownerName}</td>
                    <td>{item.managerName}</td>
                    <td>{item.team}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

         
          {isCreateProjectModalOpen && (
            <div
              className="position-fixed top-50 start-50 translate-middle"
              style={{ width: '700px', padding: '20px' }}
            >
              <ProjectForm onClose={closeCreateProjectModal} />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default DisplayProjects;
