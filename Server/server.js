const express = require('express');
const app = express();

app.use(express.json());

const studentRoutes = require('./routes/studentRoutes.js');



app.get("/", (req, res) => {
    res.status(200).send("School Management System API")
});

app.use("/students", studentRoutes);


app.listen(3000, () => {
    console.log("Server is running.....");
});