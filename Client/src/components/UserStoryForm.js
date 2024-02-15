import React, { useEffect, useState } from "react";
import axios from "axios";

const UserStoryForm = ({ onClose }) => {
  const [projects, setProjects] = useState([]);
  const [userStory, setUserStory] = useState({
    projectName: "",
    userStoryTitle: "",
    userStoryDescription: "",
    priority: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5001/all-projects")
      .then((res) => {
        const updatedData = res.data?.map((item) => item.projectName);
        setProjects(updatedData);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const onSubmitClicked = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/add-user-story", userStory)
      .then((res) => {
        window.alert("User story added successfully!");
        onClose(); // Close the modal after successful user story creation
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <form className="card animated fadeIn w-100 p-3">
      <div className="card-body">
        <h4
          className="title"
          style={{
            fontSize: "24px",
            fontWeight: 600,
            margin: "10px 0px",
            color: "#f44336",
          }}
        >
          Create User Story
        </h4>
        <hr />
        <div className="col-md-12 p-2">
          <label className="form-label">Project</label>
          <select
            className="form-select form-control"
            aria-label="Default select example"
            onChange={(e) => {
              setUserStory({
                ...userStory,
                projectName: e.target.value,
              });
            }}
          >
            <option selected disabled>
              Select Project
            </option>
            {projects?.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="container-fluid m-0 p-0">
          <div className="row m-0 p-0">
            {/* User Story Title */}
            <div className="col-md-12 p-2">
              <label className="form-label">User Story Title</label>
              <textarea
                onChange={(e) => {
                  setUserStory({
                    ...userStory,
                    userStoryTitle: e.target.value,
                  });
                }}
                placeholder="Enter User Story Title"
                className="form-control"
                type="text"
              />
            </div>
            {/* User Story Description */}
            <div className="col-md-12 p-2">
              <label className="form-label">User Story Description</label>
              <textarea
                onChange={(e) => {
                  setUserStory({
                    ...userStory,
                    userStoryDescription: e.target.value,
                  });
                }}
                placeholder="Enter User Story Description"
                className="form-control"
                type="text"
              />
            </div>
            {/* Priority  */}
            <div className="col-md-12 p-2">
              <label className="form-label">Priority </label>
              <input
                onChange={(e) => {
                  setUserStory({
                    ...userStory,
                    priority: Number(e.target.value),
                  });
                }}
                placeholder="Enter Priority"
                className="form-control"
                type="number"
              />
            </div>
          </div>
          <div className="mt-2 p-2 d-flex align-items-end justify-content-end">
            <button
              type="submit"
              className="btn p-2 btn-primary w-full"
              onClick={onSubmitClicked}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserStoryForm;
