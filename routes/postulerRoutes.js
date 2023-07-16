const express = require('express');
const router = express.Router();
const multer = require('multer');


const upload = multer(); //middleware gère le téléchargement du fichier pour le champ 'cvFile' et rend le fichier disponible dans l'objet de requête (req.file) pour un traitement ultérieur dans la route.

const internshipApplicationController = require('../controller/postulerController');

router.post('/internship-application', upload.single('cvFile'), internshipApplicationController.submitInternshipApplication);
router.get('/internship-applications', internshipApplicationController.getAllInternshipApplications);


module.exports = router;
