const express = require('express');
const mongoose = require('mongoose');
const app = express();
let port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();

app.use(cors());
const dbURI = `mongodb+srv://darshan:${process.env.REACT_APP_PASSWORD}@cluster0.yyd90.mongodb.net/IPL_Data?retryWrites=true&w=majority`;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Database

mongoose
  .connect(dbURI, options)
  .then(() => {
    console.log('Database Connection Established');
  })
  .catch(() => {
    console.log('Database Connection Not Successfull');
  });

const teamSchema = new mongoose.Schema({}, { strict: false });

var TeamD = mongoose.model('teamdetails', teamSchema);
var Team = mongoose.model('teams', teamSchema);

// Server
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.post('/addPlayer', async (req, res) => {
  if (req.body.userData.code === '3453') {
    var data = await TeamD.insertMany([req.body.playerData]);
    res.send(data);
  }
});

app.get('/teams', async (req, res) => {
  var data = await Team.find();
  res.send(data);
});

app.get('/teams/:details', async (req, res) => {
  var teamCode = req.params.details;
  var data = await Team.find({ code: teamCode });
  res.send(data);
});

app.get('/teamPlayers/:details', async (req, res) => {
  var teamCode = req.params.details;
  var data = await TeamD.find({ playingFor: teamCode });
  res.send(data);
});

app.get('/player/:details', async (req, res) => {
  var teamCode = req.params.details;
  var data = await TeamD.find({ playerName: teamCode });
  res.send(data);
});
