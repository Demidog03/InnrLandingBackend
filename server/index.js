// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const dbUri = process.env.DB_URI

// Set up the app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Set up the database connection

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Define the user schema
const userSchema = new mongoose.Schema({
    email: String,
    country: String
});

// Define the user model
const User = mongoose.model('User', userSchema);

// Define the routes
app.post('/users', (req, res) => {
    const user = new User({
        email: req.body.email,
        country: req.body.country
    });

    user.save()
        .then(() => {
            res.status(201).send('User saved successfully');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error saving user');
        });
});

// Start the server
const port = 5000; // Replace with your desired port number
app.listen(port, () => console.log(`Server listening on port ${port}`));