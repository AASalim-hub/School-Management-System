const express = require('express');
const app = express();

let students = [{
    id: 1,
    name: "AA Salim",
    age: 22,
    className: "300L",
    gender: "Male"
},
{
    id: 2,
    name: "Abdul O",
    age: 23,
    className: "300L",
    gender: "Male"
},
{
    id: 3,
    name: "Usman Iko",
    age: 20,
    className: "300L",
    gender: "Male"
},
{
    id: 4,
    name: "Aisha Bint",
    age: 20,
    className: "300L",
    gender: "female"
},
]


app.get("/", (req, res) => {
    res.send("School Management System API")
})


app.get("/students", (req, res) => {
    res.json(students);
})

app.get("/student/:id", (req, res) => {

    let id = Number(req.params.id);

    let student = students.find(student => student.id === id);

    if (!student) {
        return res.json({
            message: `Student with the id: ${req.params.id} does not exist`
        })
    }

    res.json(student);
})





app.listen(3000, () => {
    console.log("Server is running.....")
})