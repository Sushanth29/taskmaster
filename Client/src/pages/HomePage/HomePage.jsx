import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import AppLayout from '../AppLayout';

const Home = () => {
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const [userStories, setUserStories] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = Cookies.get('userId');

        const user = await axios.get(`http://localhost:5001/get-user/${userId}`);
        const userName = user.data.username;

        const teamsResponse = await axios.get(`http://localhost:5001/teams-by-user-id/${userName}`);
        setTeams(teamsResponse.data);

        const projectsResponse = await axios.get(`http://localhost:5001/projects-by-user-id/${userName}`);
        setProjects(projectsResponse.data);

        const userStoriesResponse = await axios.get(`http://localhost:5001/user-stories-by-user-id/${userId}`);
        setUserStories(userStoriesResponse.data);

        const tasksResponse = await axios.get(`http://localhost:5001/tasks-by-user-id/${userId}`);
        setTasks(tasksResponse.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <AppLayout>
      <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '20px', backgroundColor: '#f5f5f5', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '20px', color: '#333' }}>Welcome to your Dashboard</h1>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginRight: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>Your Teams</h2>
            <ul style={{ listStyle: 'none', padding: '0' }}>
              {teams.map((team) => (
                <li key={team.teamName} style={{ marginBottom: '10px' }}>
                  <Link to={`/team/${team.teamName}`} style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>{team.teamName}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>Your Team Projects</h2>
            <ul style={{ listStyle: 'none', padding: '0' }}>
              {projects.map((project) => (
                <li key={project._id} style={{ marginBottom: '10px' }}>
                  <Link to={`/project/${project.projectName}`} style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>{project.projectName}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginRight: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>Your User Stories</h2>
            <ul style={{ listStyle: 'none', padding: '0' }}>
              {userStories.map((userStory) => (
                <li key={userStory._id} style={{ marginBottom: '10px' }}>
                  <Link to={`/user-story/${userStory.userStoryTitle}`} style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>{userStory.userStoryTitle}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>Your Tasks</h2>
            <ul style={{ listStyle: 'none', padding: '0' }}>
              {tasks.map((task) => (
                <li key={task._id} style={{ marginBottom: '10px' }}>
                  <Link to={`/task/${task.task}`} style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>{task.task}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
