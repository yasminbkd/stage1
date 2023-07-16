const express = require('express');
const router = express.Router();
const sendEmail = require('../controller/sendEmail');

// Handle POST request to /api/contact
router.post('/contact', async (req, res) => {
  // Extract the form data
  const result= req.body;
  

  // Create the email options
  const emailOptions = {
    from: result.email,
    to: 'yasminbenkhedim@gmail.com', // Replace with your desired recipient email address
    subject: result.subject,
    text: `Name: ${result.name}\nEmail: ${result.email}\nMessage: ${result.message}`,
  };

  try {
    // Send the email
     sendEmail(emailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }

});
module.exports = router;
