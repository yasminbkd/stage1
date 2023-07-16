const nodemailer = require('nodemailer');

const sendEmail = async (emailOptions) => {
  // Retrieve the email and password from environment variables
  const email = 'yasminbenkhedim@gmail.com';
  const password = 'jgyngsewepyrwwtr';

  // Create a transporter object
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: email,
      pass: password,
    },
  });

  try {
    // Send the email
    await transporter.sendMail(emailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
