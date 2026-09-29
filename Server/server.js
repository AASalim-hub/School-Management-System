const express = require('express');
const app = express();

let students = {
    name: "AA Salim",
    age: 22,
    className: "300L",
    gender: "Male"
}


app.get("/", (req, res) => {
    res.send("School Management System API")
})


app.get("/students", (req, res) => {
    res.json(students);
})



app.listen(3000, () => {
    console.log("Server is running.....")
})