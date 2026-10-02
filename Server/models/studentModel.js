const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: string,
        required: true,
        minLength: 3
    },

    age: {
        type: number,
        required: true,
        min: 18,
        max: 75
    },

    className: {
        type: string,
        required: true,
    },

    gender: {
        type: string,
        required: true,
        lowercase: true,
        enum: ['male', 'female', 'others']
    }
}, {
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
