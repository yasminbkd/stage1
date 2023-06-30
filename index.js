const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();




const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
const authRoutes = require('./routes/authRoutes.js');
const stagesRoutes = require('./routes/stageRoutes.js');
app.use(authRoutes);
app.use(stagesRoutes);

// Start the server
const port = process.env.PORT || 3000;
mongoose.connect("mongodb+srv://yasminbenkhedim:UOiSzTUyqp9dj4DQ@cluster0.jkmdkd8.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
