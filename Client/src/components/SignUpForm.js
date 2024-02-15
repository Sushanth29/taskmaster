import React, { useState } from "react";
import axios from "axios";
export default function SignUpForm() {
  const [users, setUsers] = useState();

  const onSubmitClicked = () => {
    axios
      .post("http://localhost:5001/add-user", users)
      .then((response) => {
        console.log("user added successfully", response.data);
        window.alert("user added success..!");
      })
      .catch((error) => {
        console.log("Error while adding users");
      });
  };

  return (
    <>
      <form className="card border-0 w-100 p-3">
        <div className="card-body"  style={{ width: "800px", marginRight: "400px" }}>
          <h4 className="title">Sign Up</h4>
          <hr  style={{ width: "200px" }}/>
          <div className="container-fluid m-0 p-0"  style={{ width: "300px" }}>
            <div className="row m-0 p-0">
              {/* First Name */}
              <div className="col-md-12 p-2">
                <label className="form-label">First Name</label>
                <input
                  placeholder="First Name"
                  className="form-control"
                  type="text"
                  name="firstName"
                  onChange={(e) => {
                    setUsers({ ...users, firstName: e.target.value });
                  }}
                />
              </div>
              {/* Last Name */}
              <div className="col-md-12 p-2">
                <label className="form-label">Last Name</label>
                <input
                  placeholder="Last Name"
                  className="form-control"
                  type="text"
                  name="lastName"
                  onChange={(e) => {
                    setUsers({ ...users, lastName: e.target.value });
                  }}
                />
              </div>

              {/* User Name */}
              <div className="col-md-12 p-2">
                <label className="form-label">User Name</label>
                <input
                  placeholder="User Name"
                  className="form-control"
                  type="text"
                  name="username"
                  onChange={(e) => {
                    setUsers({ ...users, username: e.target.value });
                  }}
                />
              </div>
              {/* Password */}
              <div className="col-md-12 p-2">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  placeholder="User Password"
                  className="form-control"
                  name="password"
                  onChange={(e) => {
                    setUsers({ ...users, password: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="mt-2 p-2 d-flex align-items-end justify-content-center">
              <button
                type="submit"
                className="btn p-2 btn-primary w-full"
                onClick={(e) => {
                  e.preventDefault();
                  onSubmitClicked();
                }}
              >
                Submit
              </button>
            </div>
            <div className="text-center card_footer mt-3">
              <span>
                <a className="text-center ms-1" href="/login">
                  Have an account? Please Login{" "}
                </a>
              </span>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
