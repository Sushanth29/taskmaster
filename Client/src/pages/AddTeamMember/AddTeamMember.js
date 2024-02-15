import axios from "axios";
import React, { useEffect, useState } from "react";
import AppLayout from "../AppLayout";
export default function AddTeam() {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [teamName, setteamName] = useState({
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
      .post("http://localhost:5001/add-users-to-team", teamName)
      .then((res) => {
        window.alert("Users with Team Added successfully..!");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <AppLayout>
      <div className="px-3">
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
          class="btn btn-success btn-sm"
          onClick={onSubmitClicked}
        >
          Submit
        </button>
      </div>{" "}
      <div className="row justify-content-center align-items-start">
        <div className="col-md-4 col-lg-4 center-screen">
          <label>Select Team</label>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) =>
              setteamName({
                ...teamName,
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
                          setteamName({
                            ...teamName,
                            users: [...teamName.users, item],
                          });
                        } else {
                          const updatedUsers = teamName.users?.filter(
                            (name) => name !== item
                          );
                          setteamName({
                            ...teamName,
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
    </AppLayout>
  );
}
