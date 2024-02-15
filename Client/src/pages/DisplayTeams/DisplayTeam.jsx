import React, { useState, useEffect } from 'react';
import Team from '../Teams/Team';
import AppLayout from '../AppLayout';
import axios from 'axios';

const DisplayTeam = () => {
  const [teams, setTeams] = useState([]);
  const [isCreateTeamModalOpen, setCreateTeamModalOpen] = useState(false);

  const openCreateTeamModal = () => {
    setCreateTeamModalOpen(true);
  };

  const closeCreateTeamModal = () => {
    setCreateTeamModalOpen(false);
    fetchTeams();
  };

  const fetchTeams = () => {
    axios
      .get('http://localhost:5001/all-teams')
      .then((response) => {
        setTeams(response.data);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <AppLayout>
      <div className="row justify-content-center align-items-start">
        <div className="col-md-4 col-lg-8 center-screen card border-0 w-80 py-3" style={{ padding: '10px 40px', position: 'relative' }}>
          <div style={{ fontSize: '24px', fontWeight: 600, margin: '10px 0', color: '#f44336' }}>
            Display Teams
          </div>
          <button
            type="button"
            className="btn btn-primary position-absolute top-0 end-0 m-3"
            onClick={openCreateTeamModal}
          >
            Create Team
          </button>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Team Names</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.teamName}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {isCreateTeamModalOpen && (
            <div className="position-fixed top-50 start-50 translate-middle" style={{ width: '700px', padding: '20px' }}>
              <Team onClose={closeCreateTeamModal} />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default DisplayTeam;
