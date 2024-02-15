const user = require("../UserStory")
//add user story

const addUserStoryController = async (req, res) => {
    try {
      const userStory = new UserStory(req.body);
      await userStory.save();
      res.send(userStory);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  const InfoUserStoryController = async (req, res) => {
    try {
      const userStory = await UserStory.find({});
      res.send(userStory);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  const allUserStoryController = async (req, res) => {
    try {
      console.log("tem with project", req.body);
      const teamName = await UserStory.deleteMany({
        proj_id: { $in: req.body },
      });
      if (teamName) {
        res.send(teamName);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };
  

export default { addUserStoryController, InfoUserStoryController, allUserStoryController}
  
  