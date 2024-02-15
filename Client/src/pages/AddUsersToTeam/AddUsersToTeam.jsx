import axios from "axios";
import React, { useEffect, useState } from "react";
import AppLayout from "../AppLayout";
export default function AddUSersToTeam() {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersWithTeam, setUsersWithTeam] = useState({
    teamName: "",
    users: [],
  });

  const getUsers = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:5001/all-users")
        .then((response) => {
          return resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const getTeams = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:5001/all-teams")
        .then((response) => {
          return resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  useEffect(() => {
    Promise.all([getUsers(), getTeams()])
      .then((response) => {
        const usersList = response[0]?.map((item) => item.username);
        setUsers(usersList);
        const teamsList = response[1]?.map((item) => item.teamName);
        setTeams(teamsList);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const onSubmitClicked = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/add-users-to-team", usersWithTeam)
      .then((res) => {
        window.alert("Users with Team Added successfully..!");
        setUsersWithTeam({
          teamName: "",
          users: [],
        });
      })
      .catch((err) => {
        console.log("Error", err);
        window.alert("Failed to add Users to Team..!");
        setUsersWithTeam({
          teamName: "",
          users: [],
        });
      });
  };

  return (
    <AppLayout>
      <div className="row justify-content-center">
        <div className="col-md-4 col-lg-8 center-screen">
          <div
            className="card animated fadeIn p-3 "
            style={{ margin: "10px 50px 10px 50px" }}
          >
            <div className="d-flex justify-content-between">
              <h4
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  margin: "10px 0px",
                  color: "#f44336",
                }}
              >
                Add Team Members
              </h4>
              <button
                type="button"
                class="btn btn-danger btn-sm"
                onClick={onSubmitClicked}
              >
                Submit
              </button>
            </div>{" "}
            <div className="col-md-12 p-2 mb-3">
              <label>Select Team</label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) =>
                  setUsersWithTeam({
                    ...usersWithTeam,
                    teamName: e.target.value,
                  })
                }
              >
                <option selected disabled>
                  Open this select menu
                </option>
                {teams?.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-12 p-2 mb-3">
              <label>Select Persons</label>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Team Names</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((item, index) => (
                    <tr>
                      <th scope="row">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setUsersWithTeam({
                                ...usersWithTeam,
                                users: [...usersWithTeam.users, item],
                              });
                            } else {
                              const updatedUsers = usersWithTeam.users?.filter(
                                (name) => name !== item
                              );
                              setUsersWithTeam({
                                ...usersWithTeam,
                                users: updatedUsers,
                              });
                            }
                          }}
                        />
                      </th>
                      <td>{item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
