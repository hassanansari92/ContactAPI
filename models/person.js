const mongoose = require('mongoose');

const person = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
    },
    Email: {
        type: String
    },
    Address: {
        type: String
    },
    PhoneNumber: {
        type: String
    },
    MobileNumber: {
        type: String
    },
    LastName: {
        type: String
    },
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category'
    },
    SubCategoryId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory'
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Person', person);