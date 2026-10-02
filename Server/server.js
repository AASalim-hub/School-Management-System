require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const studentRoutes = require('./routes/studentRoutes.js');



app.get("/", (req, res) => {
    res.status(200).send("School Management System API")
});

app.use("/students", studentRoutes);


mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB successfully!");
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.....`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error.message);
    });