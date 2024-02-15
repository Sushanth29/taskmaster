import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function LoginForm() {
  const [user, setUser] = useState();

  const navigate = useNavigate();
  const onSubmitClicked = () => {
    axios
      .get("http://localhost:5001/user-info", {
        params: {
          username: user.username,
          password: user.password,
        },
      })
      .then((res) => {
        console.log("users details", res.data);
        Cookies.set('userId', res.data._id); 
        window.alert("Login success..!");
        navigate('/home-page');
      })
      .catch((err) => {
        window.alert("Failed to Login..!");
        console.log("error", err);
      });
  };
  return (
    <>
      <form className="card border-0 w-100 p-3" style={{ width: "1000px", margin: "100px" }}>
        <div className="card-body" style={{ width: "500px", marginRight: "400px" }}>
          <h4 className="title">Login</h4>
          <hr style={{ width: "200px" }}/>
          <div className="container-fluid m-0 p-0" style={{ width: "200px"}}>
            <div className="row m-0 p-0">
              {/* User Name */}
              <div className="col-md-12 p-2">
                <label className="form-label">User Name</label>
                <input
                  placeholder="User Name"
                  className="form-control"
                  type="text"
                  name="username"
                  onChange={(e) => {
                    setUser({ ...user, username: e.target.value });
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
                    setUser({ ...user, password: e.target.value });
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
                style={{ width: "100px" }}
              >
                Submit
              </button>
            </div>
            <div class="text-center card_footer mt-3">
              <span>
                <a class="text-center ms-1" href="/signup">
                  Don't have an account? Please Sign Up{" "}
                </a>
              </span>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
