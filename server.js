const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//env config
dotenv.config();

//mongodb connection
connectDB();

const app = express();

//router import
const userRoutes = require('./routes/authRoutes')
const jobRoutes = require('./routes/jobRoutes')
//middlewares

app.use(cors());
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send('Welcome to Backend API')
})
app.use("/api/user", userRoutes)
app.use('/api/job', jobRoutes)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on Port no.  ${PORT}`)
})
