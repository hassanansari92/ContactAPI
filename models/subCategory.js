const mongoose = require('mongoose');

const subCategory = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('SubCategory', subCategory);