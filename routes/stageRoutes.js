const express = require('express');
const stageController = require('../controller/stageController');
const authController = require('../controller/authController');

const router = express.Router();

// Create a stage
router.post('/stages', stageController.createStage);

// Get all stages
router.get('/stages', stageController.getAllStages);

// Get a single stage by ID
router.get('/stages/:stageId', stageController.getStageById);

// Update a stage
router.patch('/stages/:stageId',  stageController.updateStage);

// Delete a stage
router.delete('/stages/:stageId', stageController.deleteStage);

module.exports = router;
