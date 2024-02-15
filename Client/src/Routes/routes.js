import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../pages/Login/Login";
import Project from "../pages/Projects/Project";
import SignUp from "../pages/SignUp/SignUp";
import CreateTask from "../pages/Tasks/CreateTask";
import ViewTasks from "../pages/Tasks/ViewTasks"
import TeamRoaster from "../pages/TeamRoasters/TeamRoaster";
import Team from "../pages/Teams/Team";
import UserStory from "../pages/UserStories/UserStory";
import DisplayTeam from "../pages/DisplayTeams/DisplayTeam";
import DisplayProjects from "../pages/DisplayProjects/DisplayProjects";
import AddUSersToTeam from "../pages/AddUsersToTeam/AddUsersToTeam";
import DisplayUsersToTeam from "../pages/DisplayUsersToTeam/DisplayUsersToTeam";
import DisplayUserStory from "../pages/DisplayUserStory/DisplayUserStory";
import AssignUserStories from "../pages/AssignUserStories/AssignUserStories";
import HomePage from "../pages/HomePage/HomePage";
import TeamDetails from "../pages/DisplayTeams/TeamDetails";
import ProjectDetails from "../pages/DisplayProjects/ProjectDetails";
import UserStoryDetails from "../pages/DisplayUserStory/UserStoryDetails";
import TaskDetails from "../pages/Tasks/TaskDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,

    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "display-teams",
        element: <DisplayTeam />,
      },

      { path: "projects", element: <Project /> },
      {
        path: "display-projects",
        element: <DisplayProjects />,
      },
      {
        path: "add-users-to-team",
        element: <AddUSersToTeam />,
      },
      {
        path: "display-users-to-team",
        element: <DisplayUsersToTeam />,
      },
      { path: "teams", element: <Team /> },
      { path: "createTasks", element: <CreateTask /> },
      { path: "viewTasks", element: <ViewTasks /> },

      { path: "teamRoasters", element: <TeamRoaster /> },
      { path: "userStories", element: <UserStory /> },
      { path: "display-user-story", element: <DisplayUserStory /> },
      {path: "assignUserStories", element: <AssignUserStories/> },
      { path: "home-page", element: <HomePage /> },
      { path: "team/:teamName", element: <TeamDetails /> },
      { path: "project/:projectName", element: <ProjectDetails /> },
      { path: "user-story/:userStoryTitle", element: <UserStoryDetails /> },
      { path: "task/:task", element: <TaskDetails /> },

    ],
  },
]);
