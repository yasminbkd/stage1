const Stage = require('../model/stage');

// Create a stage POST 
exports.createStage = async (req, res) => {


  const { titre, duree, competences, description, outils } = req.body;

  try {
    const stage = new Stage({ titre, duree, competences, description, outils});
    await stage.save();
    res.status(201).json(stage);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// GET all stages
exports.getAllStages = async (req, res) => {
  try {
    const stages = await Stage.find(); //récupérer tous les données de "stages"
    res.json(stages);  //pour envoyer les données sous forme de réponse JSON au client.
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

// Update a stage by id 
exports.updateStage = async (req, res) => {


  const { stageId } = req.params;
  const { titre, duree, competences, description, outils } = req.body;

  try {
    const stage = await Stage.findById(stageId);
    if (!stage) {
      return res.status(404).send('Stage not found.');
    }

    stage.titre = titre;
    stage.duree = duree;
    stage.competences = competences;
    stage.description = description; 
    stage.outils = outils;

    await stage.save();
    res.json(stage);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete a stage by id
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
