const Stage = require('../model/stage');

// Create a stage
exports.createStage = async (req, res) => {


  const { titre, duree, competences } = req.body;

  try {
    const stage = new Stage({ titre, duree, competences });
    await stage.save();
    res.status(201).json(stage);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get all stages
exports.getAllStages = async (req, res) => {
  try {
    const stages = await Stage.find();
    res.json(stages);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get a single stage by ID
exports.getStageById = async (req, res) => {
  const { stageId } = req.params;

  try {
    const stage = await Stage.findById(stageId);
    if (!stage) {
      return res.status(404).send('Stage not found.');
    }
    res.json(stage);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update a stage
exports.updateStage = async (req, res) => {


  const { stageId } = req.params;
  const { titre, duree, competences } = req.body;

  try {
    const stage = await Stage.findById(stageId);
    if (!stage) {
      return res.status(404).send('Stage not found.');
    }

    stage.titre = titre;
    stage.duree = duree;
    stage.competences = competences;

    await stage.save();
    res.json(stage);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete a stage
exports.deleteStage = async (req, res) => {

  const { stageId } = req.params;

  try {
    const stage = await Stage.findById(stageId);
    if (!stage) {
      return res.status(404).send('Stage not found.');
    }

    await stage.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
