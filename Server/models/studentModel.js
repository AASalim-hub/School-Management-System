const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },

    age: {
        type: Number,
        required: true,
        min: 18,
        max: 75
    },

    className: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
        required: true,
        lowercase: true,
        enum: ['male', 'female', 'others']
    }
}, {
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
