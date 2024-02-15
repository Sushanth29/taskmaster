import React from "react";

export default function TaskForm() {
  return (
    <>
      <form className="card border-0 w-100 p-3">
        <div className="card-body">
          <h4 className="title">Create New Task</h4>
          <hr />
          <div className="container-fluid m-0 p-0">
            <div className="row m-0 p-0">
              {/* Task */}
              <div className="col-md-6 p-2">
                <label className="form-label">Task</label>
                <textarea
                  placeholder="Task 1"
                  className="form-control"
                  type="text"
                  rows="1"
                />
              </div>

              {/* User Story */}
              <div className="col-md-6 p-2">
                <label className="form-label">User Story</label>
                <select
                  className="form-select form-control"
                  aria-label="Default select example"
                >
                  <option selected disabled>
                    Select User Story
                  </option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>

              {/* Created by */}
              <div className="col-md-12 p-2">
                <label className="form-label">Created by</label>
                <select
                  className="form-select form-control"
                  aria-label="Default select example"
                >
                  <option selected disabled>
                    Select Created By
                  </option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              {/* Team */}
              <div className="col-md-12 p-2">
                <label className="form-label">Status</label>
                <select
                  className="form-select form-control"
                  aria-label="Default select example"
                >
                  <option selected disabled>
                    Select Status
                  </option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div className="mt-2 p-2 d-flex align-items-end justify-content-end">
              <button type="submit" className="btn p-2 btn-primary w-full">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
