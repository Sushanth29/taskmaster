import React from "react";

export default function TeamRoasterForm() {
  return (
    <form className="card border-0 w-100 p-3">
      <div className="card-body">
        <h4 className="title">Create team roster</h4>
        <hr />
        <div className="container-fluid m-0 p-0">
          <div className="row m-0 p-0">
            {/* Team  */}
            <div className="col-md-12 p-2">
              <label className="form-label">Team</label>
              <select
                className="form-select form-control"
                aria-label="Default select example"
              >
                <option selected disabled>
                  Select Team
                </option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            {/* Member  */}
            <div className="col-md-12 p-2">
              <label className="form-label">Member</label>
              <select
                className="form-select form-control"
                aria-label="Default select example"
              >
                <option selected disabled>
                  Select Member
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
  );
}
