const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')
require('dotenv').config();
require('./Config/db')
const port = process.env.PORT;

//middleware
app.use(express.json())
app.use(cookieParser())

const authRoute = require('./Routes/user');


app.use('/auth', authRoute);




app.listen(port, ()=>{
    console.log("Server Started on port:",port);
})