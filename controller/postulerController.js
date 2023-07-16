const InternshipApplication = require('../model/postuler');

exports.submitInternshipApplication = async (req, res) => {
  try {
    const { name, email, phoneNumber, faculty, internshipDuration, message } = req.body;

    // Create a new InternshipApplication instance
    const internshipApplication = new InternshipApplication({
      name,
      email,
      phoneNumber,
      faculty,
      internshipDuration,
      message,
      cv: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    // Save the internship application to the database
    await internshipApplication.save();

    res.status(200).json({ message: 'Internship application submitted successfully' });
  } catch (error) {
    console.error('Error submitting internship application', error);
    res.status(500).json({ error: 'An error occurred while submitting the internship application' });
  }
};


exports.getAllInternshipApplications = async (req, res) => {
    try {
      // Retrieve all internship applications from the database
      const internshipApplications = await InternshipApplication.find();
  
      res.status(200).json(internshipApplications);
    } catch (error) {
      console.error('Error retrieving internship applications', error);
      res.status(500).json({ error: 'An error occurred while retrieving the internship applications' });
    }
  };
  