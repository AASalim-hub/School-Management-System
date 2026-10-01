const express = require('express');
const joi = require('joi');
const app = express();

app.use(express.json());


const studentsCreationSchema = joi.object({
        name: joi.string().min(3).required(),
        age: joi.number().integer().min(18).max(100).required(),
        className: joi.string().required(),
        gender: joi.string().lowercase().valid('male', 'female', 'others').required()
    })

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
    res.status(200).send("School Management System API")
})


app.get("/students", (req, res) => {
    res.json(students);
})

app.get("/students/:id", (req, res) => {

    let id = Number(req.params.id);

    let student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: `Student with the id: ${req.params.id} does not exist`
        })
    }

    res.json(student);
})


app.post("/students", (req, res) => {


    const{error, value} = studentsCreationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: "Creation failed",
            message: error.details[0].message
        })
    }

     const formattedGender = value.gender.charAt(0).toUpperCase() + value.gender.slice(1);

    let studentCreation = {
        id: students.length + 1,
        name: value.name,
        age: value.age,
        className: value.className,
        gender: formattedGender
    }

    students.push(studentCreation);

    res.status(201).json({Message: `${req.body.name} student account has been created successfully`,
    studentIfo: studentCreation 
})
})





app.listen(3000, () => {
    console.log("Server is running.....")
})