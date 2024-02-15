import axios from "axios";
import React, { useEffect, useState } from "react";
import AppLayout from "../AppLayout";
import UserStoryForm from "../../components/UserStoryForm";

// ... (previous imports)

const DisplayUserStory = () => {
  const [userStories, setUserStories] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [isCreateUserStoryModalOpen, setCreateUserStoryModalOpen] = useState(
    false
  );

  const openCreateUserStoryModal = () => {
    setCreateUserStoryModalOpen(true);
  };

  const closeCreateUserStoryModal = () => {
    setCreateUserStoryModalOpen(false);
    // After creating a new user story, refresh the list of user stories
    fetchUserStories();
  };

  const fetchUserStories = () => {
    axios
      .get("http://localhost:5001/get-user-stories")
      .then((response) => {
        setUserStories(response.data);
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  };

  useEffect(() => {
    fetchUserStories();
  }, []);

  const onSubmitClicked = () => {
    axios
      .put("http://localhost:5001/update-user-story", selectedProjects)
      .then((response) => {
        console.log("Deleted selected user stories successfully!");
        fetchUserStories();
        setSelectedProjects([]);
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  };

  return (
    <AppLayout>
      <div className="row justify-content-center align-items-start">
        <div className="col-md-4 col-lg-8 center-screen">
          <div
            className="card animated fadeIn p-3"
            style={{ margin: "10px 50px 10px 50px" }}
          >
            <div className="d-flex justify-content-between mb-3">
              <h4
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  margin: "10px 0px",
                  color: "#f44336",
                }}
              >
                User Stories
              </h4>
              <div className="d-flex">
                <button
                  type="button"
                  className="btn btn-danger btn-sm me-2"
                  onClick={onSubmitClicked}
                >
                  Delete Selected Users
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={openCreateUserStoryModal}
                >
                  Create User Story
                </button>
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Project Name</th>
                  <th scope="col">User Story Title</th>
                  <th scope="col">User Story Description</th>
                  <th scope="col">Priority</th>
                </tr>
              </thead>
              <tbody>
                {userStories?.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id={`flexCheckDefault${index}`}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProjects([
                              ...selectedProjects,
                              item.projectName,
                            ]);
                          } else {
                            const updatedProjects = selectedProjects?.filter(
                              (name) => name !== item.projectName
                            );
                            setSelectedProjects(updatedProjects);
                          }
                        }}
                      />
                    </th>
                    <td>{item?.projectName}</td>
                    <td>{item?.userStoryTitle}</td>
                    <td>{item?.userStoryDescription}</td>
                    <td>{item?.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Create User Story Modal */}
          {isCreateUserStoryModalOpen && (
            <div className="position-fixed top-50 start-50 translate-middle">
              <UserStoryForm onClose={closeCreateUserStoryModal} />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default DisplayUserStory;
