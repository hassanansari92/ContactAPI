const mongoose = require('mongoose');

const category = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Category', category);