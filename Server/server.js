const express = require('express');
const joi = require('joi');
const app = express();

app.use(express.json());

const studentsCreationSchema = joi.object({
    name: joi.string().min(3).required(),
    age: joi.number().integer().min(18).max(100).required(),
    className: joi.string().required(),
    gender: joi.string().lowercase().valid('male', 'female', 'others').required()
});

// Create an update schema where all fields are optional for PATCH
const studentsUpdateSchema = joi.object({
    name: joi.string().min(3),
    age: joi.number().integer().min(18).max(100),
    className: joi.string(),
    gender: joi.string().lowercase().valid('male', 'female', 'others')
});

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
];

app.get("/", (req, res) => {
    res.status(200).send("School Management System API")
});

app.get("/students", (req, res) => {
    res.json(students);
});

app.get("/students/:id", (req, res) => {
    let id = Number(req.params.id);
    let student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: `Student with the id: ${req.params.id} does not exist`
        });
    }

    res.json(student);
});

app.post("/students", (req, res) => {
    const { error, value } = studentsCreationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: "Creation failed",
            message: error.details[0].message
        });
    }

    const formattedGender = value.gender.charAt(0).toUpperCase() + value.gender.slice(1);

    let studentCreation = {
        id: students.length + 1,
        name: value.name,
        age: value.age,
        className: value.className,
        gender: formattedGender
    };

    students.push(studentCreation);

    res.status(201).json({
        Message: `${req.body.name} student account has been created successfully`,
        studentInfo: studentCreation 
    });
});

app.patch("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const studentIndex = students.findIndex(student => student.id === id);

    if (studentIndex === -1) {
        return res.status(404).json({
            message: `Student with the id: ${req.params.id} does not exist`
        });
    }

    const { error, value } = studentsUpdateSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: "Update failed",
            message: error.details[0].message
        });
    }

    const currentStudent = students[studentIndex];

    let formattedGender = currentStudent.gender;
    if (value.gender) {
        formattedGender = value.gender.charAt(0).toUpperCase() + value.gender.slice(1);
    }

    const updatedStudent = {
        ...currentStudent,
        name: value.name !== undefined ? value.name : currentStudent.name,
        age: value.age !== undefined ? value.age : currentStudent.age,
        className: value.className !== undefined ? value.className : currentStudent.className,
        gender: formattedGender
    };

    students[studentIndex] = updatedStudent;

    res.status(200).json({
        message: "Student updated successfully",
        student: updatedStudent
    });
});

app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const studentIndex = students.findIndex(student => student.id === id);

    if (studentIndex === -1) {
        return res.status(404).json({
            message: `Student with the id: ${req.params.id} does not exist`
        });
    }

    const deletedStudent = students.splice(studentIndex, 1)[0];

    res.status(200).json({
        message: "Student deleted successfully",
        deletedStudent: deletedStudent
    });
});

app.listen(3000, () => {
    console.log("Server is running.....");
});