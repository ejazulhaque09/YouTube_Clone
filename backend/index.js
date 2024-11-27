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
const videoRoute = require('./Routes/video')
const commentRoute = require('./Routes/comment')

app.use('/auth', authRoute);
app.use('/video', videoRoute);
app.use('/comment',commentRoute)


app.listen(port, ()=>{
    console.log("Server Started on port:",port);
})