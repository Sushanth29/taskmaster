const User = require("../Teams");

// Create (POST): Add a new team
const addteamController = async (req, res) => {
    try {
      const team_name = await User.create(req.body);
      res.status(201).json(team_name);
    } catch (error) {
      console.error("Error adding team:", error);
      res.status(500).json({ error: "Error adding team" });
    }
  };
  
  // Read (GET): Retrieve team information 
  const teamInfoController = async (req, res) => {
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
  };
  
  // Read (GET): Retrieve all teams
  const allteamsController =  async (req, res) => {
    try {
      const team_name = await User.find({});
      res.json(team_name);
    } catch (error) {
      console.error("Error retrieving all team:", team_name);
      res.status(500).json({ error: "Error retrieving all team" });
    }
  };
  
  
  
export default { addteamController, teamInfoController, allteamsController}