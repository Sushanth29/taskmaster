// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/Users");
const Team = require("./models/Teams");
const Project = require("./models/Projects");
const UsersWithTeam = require("./models/UsersWithTeam")
const UserStory = require("./models/UserStory")
const Assigned = require("./models/Assigned")
const TaskList=require("./models/TaskList")
// const {
//   addUserController,
//   userInfoController,
//   allUserController,
// } = require("./controllers/userController");

// Create an Express app
const app = express();
const port = process.env.PORT || 5001;

const cookieParser = require('cookie-parser');

// Database connection URL(Change as your requirement)
const uri =
  "mongodb+srv://vgarrepally:dR7NPdix6fq6bDC3@se-assignment.mec6y3j.mongodb.net/se-assignments?retryWrites=true&w=majority";

// Middleware
app.use(express.json());
app.use(cors());

app.use(cookieParser())

// CRUD Operations

// Create (POST): Add a new user
app.post("/add-user", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Error adding user" });
  }
});

// Read (GET): Retrieve user information by username and password
app.get("/user-info", async (req, res) => {
  const { username, password } = req.query;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.cookie('userId', user._id, { maxAge: 1000000, httpOnly: true })
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user info:", error);
    res.status(500).json({ error: "Error retrieving user info" });
  }
});

// Read (GET): Retrieve all users
app.get("/all-users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error("Error retrieving all users:", error);
    res.status(500).json({ error: "Error retrieving all users" });
  }
});

app.get('/get-user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create (POST): Add a new team
app.post("/add-team", async (req, res) => {
  try {
    const team_name = await Team.create(req.body);
    res.status(201).json(team_name);
  } catch (error) {
    console.error("Error adding team:", error);
    res.status(500).json({ error: "Error adding team" });
  }
});

// Read (GET): Retrieve team information
app.get("/team-info", async (req, res) => {
  const { team_name } = req.query;
  try {
    const user = await User.findOne({ team_name });
    if (team_name) {
      res.json(team_name);
    } else {
      res.status(404).json({ error: "team not found" });
    }
  } catch (error) {
    console.error("Error retrieving team info:", error);
    res.status(500).json({ error: "Error retrieving team info" });
  }
});

app.get('/get-team/:teamName', async (req, res) => {
  try {
    const team = await UsersWithTeam.find({teamName: req.params.teamName});
    if (!team) {
      return res.status(404).send({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read (GET): Retrieve all teams
app.get("/all-teams", async (req, res) => {
  try {
    const team_name = await Team.find({});
    res.json(team_name);
  } catch (error) {
    console.error("Error retrieving all users:", team_name);
    res.status(500).json({ error: "Error retrieving all users" });
  }
});

app.post("/add-project", async (req, res) => {
  try {
    const projects = await Project.create(req.body);
    res.status(201).json(projects);
  } catch (error) {
    console.error("Error adding Project:", error);
    res.status(500).json({ error: "Error adding project" });
  }
});

app.get("/all-projects", async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    console.error("Error retrieving all projects:", team_name);
    res.status(500).json({ error: "Error retrieving all projects" });
  }
});

app.get('/get-project/:projectName', async (req, res) => {
  try {
    const project = await Project.find({projectName: req.params.projectName});
    if (!project) {
      return res.status(404).send({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).send(error);
  }
});

// add users with team
app.post("/add-users-to-team", async (req, res) => {
  try {
    console.log("tem with project", req.body);
    const usersWithTeam = new UsersWithTeam(req.body);
    await usersWithTeam.save();
    res.send(usersWithTeam);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/get-users-for-team", async (req, res) => {
  const teamName = req.query.teamName;
  try {
    console.log("tem with project", teamName);
    const usersWithTeam = await UsersWithTeam.findOne({ teamName: teamName });
    if (usersWithTeam) {
      res.send(usersWithTeam);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
app.put("/add-users-to-team", async (req, res) => {
  try {
    const usersWithTeam = await UsersWithTeam.findOneAndUpdate(
      { teamName: req.body.teamName },
      {
        $set: {
          teamName: req.body.teamName,
          users: req.body.users,
        },
      }
    );
    if (usersWithTeam) {
      res.send(usersWithTeam);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//add user story

app.post("/add-user-story", async (req, res) => {
  try {
    const userStory = new UserStory(req.body);
    await userStory.save();
    res.send(userStory);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/get-user-stories", async (req, res) => {
  try {
    const userStory = await UserStory.find({});
    res.send(userStory);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/get-user-story/:userStoryTitle', async (req, res) => {
  try {
    const userStory = await UserStory.find({userStoryTitle: req.params.userStoryTitle});
    if (!userStory) {
      return res.status(404).send({ message: 'User story not found' });
    }
    res.json(userStory);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/update-user-story", async (req, res) => {
  try {
    console.log("tem with project", req.body);
    const usersWithTeam = await UserStory.deleteMany({
      projectName: { $in: req.body },
    });
    if (usersWithTeam) {
      res.send(usersWithTeam);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/get-unassigned-user-stories', async (req, res) => {
  try {
    const unassignedUserStories = await UserStory.find({ assigned_to: null });

    res.json(unassignedUserStories);
  } catch (error) {
    console.error('Error fetching unassigned user stories: ', error);
    res.status(500).json({ message: 'Failed to fetch unassigned user stories' });
  }
});

app.get('/get-users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/get--user-story/:user_story_id', async (req, res) => {
  try {
    
    const user_story_id = req.params.user_story_id; 
   
    const userStory = await UserStory.findById(user_story_id);
   
    res.json(userStory);
  } catch (error) {
    console.error('Error fetching user story: ', error);
    res.status(500).json({ message: 'Failed to fetch user story' });
  }
});

app.get('/get-assigned-user-stories', async (req, res) => {
  try {
    const assignedUserStories = await UserStory.find({ assigned_to: { $ne: null } });

    res.json(assignedUserStories);
  } catch (error) {
    console.error('Error fetching assigned user stories: ', error);
    res.status(500).json({ message: 'Failed to fetch assigned user stories' });
  }
});

app.post('/assign-user-story', async (req, res) => {
  const { user_story_id, user_id } = req.body; 

  try {
    const assignment = new Assigned({
      user_story_id,
      user_id,
    });

    await assignment.save();

    await UserStory.findByIdAndUpdate(user_story_id, { assigned_to: user_id });

    res.json({ message: 'User story assigned successfully' });
  } catch (error) {
    console.error('Error assigning user story: ', error);
    res.status(500).json({ message: 'Failed to assign user story' });
  }
});

app.post('/create-task', async (req, res) => {
  try {
    const { task, userStory, user_id, status } = req.body;

    const newTask = new TaskList({
      task: task,
      user_story_id: userStory,
      created_by: user_id,
      status: status,
    });

    const savedTask = await newTask.save();

    res.status(201).json({ message: 'Task saved successfully', task: savedTask });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error saving the task' });
  }
});

app.get('/get-user-tasks/:userId', async (req, res) => {
  try {
    const userId = req.params.userId; 
    const tasks = await TaskList.find({ created_by: userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.patch('/update-status/:taskId', async (req, res) => {
  try {
    const { status } = req.body;
    const taskId = req.params.taskId;

    await TaskList.findByIdAndUpdate(taskId, { status });

    res.status(200).send('Task status updated successfully');
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/get-task/:task', async (req, res) => {
  try {
    const task = await TaskList.find({task: req.params.task});
    if (!task) {
      return res.status(404).send({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/teams-by-user-id/:userName', async (req, res) => {
  try {
    const userName = req.params.userName;
    const teams = await UsersWithTeam.find({ users: userName });
    res.json(teams);
  } catch (error) {
    console.error('Error fetching teams: ', error);
    res.status(500).json({ message: 'Failed to fetch teams' });
  }
});


app.get('/projects-by-user-id/:userName', async (req, res) => {
  try {
    const userName = req.params.userName;
    const teams = await UsersWithTeam.find({ users: userName });
   // console.log(teams)
    const teamNames = teams.map((team) => team.teamName);
    //console.log(teamNames)
    const projects = await Project.find({ team: { $in: teamNames } });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects: ', error);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
});


app.get('/user-stories-by-user-id/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userStories = await UserStory.find({ assigned_to: userId });
    res.json(userStories);
  } catch (error) {
    console.error('Error fetching user stories: ', error);
    res.status(500).json({ message: 'Failed to fetch user stories' });
  }
});


app.get('/tasks-by-user-id/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Filter tasks by status
    const tasks = await TaskList.find({ created_by: userId, status: { $in: ['In Progress', 'Awaiting Confirmation'] } });
    
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks: ', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);

  // mongoose server connection
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error", err);
    });
});
