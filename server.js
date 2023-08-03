const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', authRoutes);

//MONGODB URL to connect to your MONGO Database
//Could be locally or on Atlas
mongoose.connect('YOUR-MONGODB-URL', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Server port could be changed accordingly to your preference.
//The Elastic Beanstalk, which is the one that I'am using for this project, uses port 8080.
app.listen(8080, () => {  
  console.log('Server is running on port 8080');
});


