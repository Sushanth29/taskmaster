const user = require("../teamName")

// add users with team
const addTeamNameController = async (req, res) => {
    try {
      console.log("tem with project", req.body);
      const teamName = new teamName(req.body);
      await teamName.save();
      res.send(teamName);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  const InfoTeamNameController = async (req, res) => {
    const team_name = req.query.team_name;
    try {
      console.log("tem with project", teamName);
      const teamName = await teamName.findOne({ team_name: team_name });
      if (teamName) {
        res.send(teamName);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };
  const allTeamNameController= async (req, res) => {
    try {
      const teamName = await teamName.findOneAndUpdate(
        { team_name: req.body.team_name },
        {
          $set: {
            team_name: req.body.team_name,
            users: req.body.users,
          },
        }
      );
      if (teamName) {
        res.send(teamName);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };
  

  export default { addTeamNameController, InfoTeamNameController, allTeamNameController}