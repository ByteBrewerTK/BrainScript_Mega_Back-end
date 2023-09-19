// Importing express
const express = require('express');
const app = express();
const connectDB = require('./config/database');

// importing config of enviorment file
require('dotenv').config();

// fetching PORT no. if not able to fetch then default port no. is 4000
const PORT = process.env.PORT || 4000;

// using json parser middleware
app.use(express.json());

// starting the server
app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})

// DB connection establize
connectDB();