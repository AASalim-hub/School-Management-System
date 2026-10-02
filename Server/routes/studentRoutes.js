const express = require('express');

const router = express.Router();

const {
    getAllStudents,
    getStudentById,
    studentCreation,
    updateStudentInfo,
    deleteStudent
} = require('../controllers/studentController.js');

router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.post('/', studentCreation);
router.patch('/:id', updateStudentInfo);
router.delete('/:id', deleteStudent);


module.exports = router;