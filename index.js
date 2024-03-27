const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const dataSchema = new mongoose.Schema({
  name: {
    type: String
  },
  studentId: {
    type: String
  }
});

const User = mongoose.model("W24student", dataSchema);

// This Activitry creates the collection called activitimodels
const user = new User({
  name: "Praneeth Appuwadu Mesthrige",
  studentId: "300360819"
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  const uri = req.body.myuri;

  // connect to the database and log the connection

   await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

    try {
      await user.save();
    } catch (error) {
      console.log(error);
    }

  // add the data to the database
  
  
  // send a response to the user
  res.send(`<h1>Document  Added</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
