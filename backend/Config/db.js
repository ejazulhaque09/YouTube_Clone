const mongoose = require('mongoose')
require('dotenv').config();
const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl)
.then (() => console.log("DataBase Connected Successfully"))
.catch((err)=> console.log("Error in connecting DB"))