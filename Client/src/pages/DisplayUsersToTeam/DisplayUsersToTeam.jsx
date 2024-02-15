import axios from "axios";
import React, { useEffect, useState } from "react";
import AppLayout from "../AppLayout";
function DisplayUsersToTeam() {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersWithTeam, setUsersWithTeam] = useState({
    teamName: "",
    users: [],
  });
  const [updateDataWithTeam, setUpdateDataWithTeam] = useState({
    teamName: "",
    users: [],
  });

  const getUsersForTeam = (teamName) => {
    axios
      .get("http://localhost:5001/get-users-for-team", {
        params: {
          teamName: teamName,
        },
      })
      .then((res) => {
        setUsersWithTeam({
          teamName: res.data.teamName,
          users: res.data.users,
        });
        setUpdateDataWithTeam({
          teamName: res.data.teamName,
          users: res.data.users,
        });
      })
      .catch((err) => {
        console.log("Error:", err);
        setUsersWithTeam({ ...usersWithTeam, users: [] });
      });
  };

  const preData = () => {
    axios
      .get("http://localhost:5001/all-users")
      .then((res) => {
        const data = res?.data?.map((item) => item.username);
        setUsers(data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
    axios
      .get("http://localhost:5001/all-teams")
      .then((response) => {
        const data = response.data?.map((item) => item.teamName);
        setTeams(data);
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  };
  useEffect(() => {
    preData();
  }, []);

  //add-users-to-team

  const onSubmitClicked = (e, data) => {
    e.preventDefault();
    console.log("updated list after remove", data);
    axios
      .put("http://localhost:5001/add-users-to-team", data)
      .then((res) => {
        getUsersForTeam(data.teamName);
        window.alert("Users with Team updated successfully..!");
      })
      .catch((err) => {
        console.log("Error", err);
        setUsersWithTeam({ ...usersWithTeam, users: [] });
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
                onClick={(e) => {
                  onSubmitClicked(e, updateDataWithTeam);
                }}
              >
                Delete All Selected Users
              </button>
            </div>{" "}
            <div className="col-md-12 p-2 mb-3">
              <label>Select Team</label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  getUsersForTeam(e.target.value);
                }}
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
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {usersWithTeam?.users?.length === 0 && <div>No data...!</div>}
                  {usersWithTeam?.users?.length > 0 &&
                    usersWithTeam?.users?.map((item, index) => (
                      <tr>
                        <th scope="row">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                            onChange={(e) => {
                              if (e.target.checked) {
                                const updatedUsers =
                                  updateDataWithTeam.users?.filter(
                                    (name) => name !== item
                                  );
                                setUpdateDataWithTeam({
                                  teamName: usersWithTeam.teamName,
                                  users: updatedUsers,
                                });
                              } else {
                                const updatedUsers = [
                                  ...updateDataWithTeam.users,
                                  item,
                                ];
                                setUpdateDataWithTeam({
                                  teamName: usersWithTeam.teamName,
                                  users: updatedUsers,
                                });
                              }
                            }}
                          />
                        </th>
                        <td>{item}</td>
                        <td>
                          {" "}
                          <button
                            type="button"
                            class="btn btn-danger btn-sm"
                            onClick={(e) => {
                              const updatedUsers = usersWithTeam?.users?.filter(
                                (name) => name !== item
                              );
                              onSubmitClicked(e, {
                                teamName: usersWithTeam.teamName,
                                users: updatedUsers,
                              });
                            }}
                          >
                            Delete
                          </button>
                        </td>
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

export default DisplayUsersToTeam;
