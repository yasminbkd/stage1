//démarrer un serveur Express.js qui utilise une base de données MongoDB pour gérer les routes d'authentification et les routes liées aux stages.
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config();




const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); //  permet de récupérer les données des formulaires HTML et de les rendre accessibles dans les gestionnaires de routes sous forme d'objets JavaScript.
app.use(bodyParser.urlencoded({ extended: true })); // Il permet de récupérer les données JSON envoyées par le client et de les rendre disponibles dans les gestionnaires de routes.
app.use(bodyParser.json());
app.use(express.static('public')); // Il permet d'envoyer des fichiers tels que des images, des feuilles de style CSS ou des scripts JavaScript au client
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
// configuration des Routes
const authRoutes = require('./routes/authRoutes.js');
const stagesRoutes = require('./routes/stageRoutes.js');
const contactRoutes = require('./routes/contactRoutes');
const postulerRoutes = require('./routes/postulerRoutes.js')

app.use(authRoutes);
app.use(stagesRoutes);
app.use(contactRoutes);
app.use(postulerRoutes);


// Start the server
const port = 8080;
mongoose.connect("mongodb://yasminbenkhedim:UOiSzTUyqp9dj4DQ@ac-addrpek-shard-00-00.jkmdkd8.mongodb.net:27017,ac-addrpek-shard-00-01.jkmdkd8.mongodb.net:27017,ac-addrpek-shard-00-02.jkmdkd8.mongodb.net:27017/?ssl=true&replicaSet=atlas-12mvg2-shard-0&authSource=admin&retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
