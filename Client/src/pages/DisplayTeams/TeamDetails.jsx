import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppLayout from '../AppLayout';
import { useParams } from 'react-router-dom';


const TeamDetails = () => {
    const [teams, setTeams] = useState([]);
    const { teamName } = useParams();
  
    useEffect(() => {
      const fetchTeamDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5001/get-team/${teamName}`);
          console.log('Team Details API response:', response.data);
          setTeams(response.data);
        } catch (error) {
          console.error('Error fetching team details:', error);
        }
      };
  
      fetchTeamDetails();
    }, [teamName]);
  
    console.log('Teams state:', teams);
  
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
                Team Details
              </h4>
              {teams.map((team, index) => (
                <div key={index}>
                  {index === 0 && <p>Team Name: {team.teamName}</p>}
                  {index === 0 && <p>Team Members: </p>}
                  {team.users && team.users.length > 0 ? (
                    <ul>
                      {team.users.map((user, userIndex) => (
                        <li key={userIndex}>{user}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No members in the team.</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppLayout>
    );
  };
  
  export default TeamDetails;
  