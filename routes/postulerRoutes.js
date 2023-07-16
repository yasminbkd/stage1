const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer();

const internshipApplicationController = require('../controller/postulerController');

router.post('/internship-application', upload.single('cvFile'), internshipApplicationController.submitInternshipApplication);
router.get('/internship-applications', internshipApplicationController.getAllInternshipApplications);


module.exports = router;
