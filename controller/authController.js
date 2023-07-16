const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const sendEmail = require('../controller/sendEmail');

exports.register = async (req, res) => {
  const { email, password, userType } = req.body;
  console.log(req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // pour avoir un mot de passe hashé sécurisé 
    // si le usertype user ne5thou ken first name w last name w kenou company ne5thou .. sinon erreur 400
    let user;
    if (userType === 'user') {
      const { firstName, lastName } = req.body;
      user = new User({
        email,
        password: hashedPassword,
        userType,
        userAttributes: { firstName, lastName },
      });
    } else if (userType === 'company') {
      const { companyName, address } = req.body;
      user = new User({
        email,
        password: hashedPassword,
        userType,
        userAttributes: { companyName, address },
      });
    } else {
      // Invalid user type
      return res.status(400).send('Invalid user type');
    }

    await user.save();

    if (userType === 'user') {
      res.status(200).send('User saved successfully');
    } else if (userType === 'company') {
      const token = jwt.sign({ userId: user._id, email: user.email }, "yasmineMolka123", {
        expiresIn: '1h',
      });
            // Send email
            await sendEmail({
              from: process.env.EMAIL_ADDRESS, // From environment variable
              to: 'yasminbenkhedim@gmail.com',
              subject: 'New Company Registration',
              text: `A new company has registered:\n\nCompany Name: ${user.userAttributes.companyName}\nEmail: ${user.email}`,
            });
      res.status(200).send({token : token});
    }

  } catch (error) {
    res.status(500).send(error.message);
  }
};




exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign({ userId: user._id, email: user.email }, "yasmineMolka123", {
          expiresIn: '1h',
        });
           res.cookie('token', token, { maxAge: 900000, httpOnly: true, sameSite: 'lax', });
           user.token = token
           console.log("log in mcha")
           user.save()
        return res.status(200).json({ token });
      }
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};





exports.logout = (req, res) => {

  res.clearCookie('token');
  res.redirect('/');
};
