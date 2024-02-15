import React, { useState } from 'react';
import axios from 'axios';

const Team = ({ onClose }) => {
  const [teamName, setTeamName] = useState('');

  const onSubmitClicked = () => {
    axios
      .post('http://localhost:5001/add-team', { teamName: teamName })
      .then((response) => {
        window.alert('Team added successfully!');
        console.log('Team added successfully', response.data);
        onClose(); 
      })
      .catch((error) => {
        console.log('Error while adding team');
      });
  };

  return (
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-7 center-screen">
          <form className="card border-0 w-100 p-3">
            <div className="card-body">
              <h4 className="title">Create new team</h4>
              <hr />
              <div className="container-fluid m-0 p-0">
                <div className="row m-0 p-0">
                  <div className="col-md-12 p-2">
                    <label className="form-label">Enter Team name</label>
                    <input
                      placeholder="Team name 1"
                      className="form-control animated fadeInUp"
                      type="text"
                      onChange={(e) => setTeamName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-2 p-2 d-flex align-items-end justify-content-end">
                  <button
                    type="button"
                    className="btn p-2 btn-primary w-full"
                    onClick={onSubmitClicked}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Team;
