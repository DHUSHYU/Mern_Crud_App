const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require("./routes/students");
require('dotenv').config(); 

const app = express();

// Middleware
app.use(cors({

  origin:"https://mern-crud-dhushyu-app.vercel.app",
  methods:"GET,POST,PUT,DELETE",
  credentials:true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// API routes
app.use('/', routes);

//mognodb connection
const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err =>{
    console.error('MongoDB connection error', err);
    process.exit(1); // Exit process with failure
});




// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
