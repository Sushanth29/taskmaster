import React from "react";

export default function Dashboard() {
  return (
    <nav class="navbar navbar-expand-lg bg-white">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Project Management
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li class="nav-item">
              <a
                class="nav-link"
                href="/display-teams"
                style={{ fontSize: "14px" }}
              >
               View Teams
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                href="/display-projects"
                style={{ fontSize: "14px" }}
              >
               View Projects
              </a>
            </li>

            <li class="nav-item">
              <a
                class="nav-link"
                href="/add-users-to-team"
                style={{ fontSize: "14px" }}
              >
                Add Users to Team
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="/display-users-to-team"
                style={{ fontSize: "14px" }}
              >
                Users to Team
              </a>
            </li>

            
            <li class="nav-item">
              <a
                class="nav-link"
                href="/assignUserStories"
                style={{ fontSize: "14px" }}
              >
                Assign User Stories
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="/display-user-story"
                style={{ fontSize: "14px" }}
              >
               View User Stories
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/viewTasks" style={{ fontSize: "14px" }}>
                View Tasks
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="/teamRoasters"
                style={{ fontSize: "14px" }}
              >
                Team Roaster
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login" style={{ fontSize: "14px" }}>
                Login
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/signup" style={{ fontSize: "14px" }}>
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
