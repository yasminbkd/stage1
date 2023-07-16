const mongoose = require('mongoose');

const stageSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  duree: { type: Number, required: true },
  competences: [{ type: String }],
  description: { type: String },
  outils: [{ type: String }],
  
  
});


module.exports = mongoose.model('Stage', stageSchema);