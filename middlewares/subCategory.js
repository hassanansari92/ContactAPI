const mongo = require('mongodb')
//const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constants');
const subCategorySchema = require('../models/subCategory');

module.exports = {
    saveCategory(req, res) {
        // Validate request
        if (!req.body.name) {
            return res.status(400).send({
                message: "subCategory Name can not be empty"
            });
        }

        // Create a  subCategory
        const  subCategory = new subCategorySchema({
            Name: req.body.name
        });

        // Save  subCategory in the database
         subCategory.save()
            .then(data => {
                res.send(data); // subCategory: data
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the subCategory."
                });
            });
    },
    getsubCategory(req, res) {
         subCategorySchema.find()
            .then(data => {
                res.send({
                    Categories: data
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving the subCategory."
                });
            });
    },
    getsubCategoryById(req, res) {
         subCategorySchema.findById(req.params.subCategoryId).then(subcategory => {
            res.send({
                subCategory: subcategory
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the subCategory."
            });
        });
    },
    updatesubCategory(req, res) {
        // Validate request
        if (!req.body.name) {
            return res.status(400).send({
                message: "Name can not be empty"
            });
        }

        // Find subCategory and update it with the request body
        subCategorySchema.findByIdAndUpdate(req.params.subCategoryId, {
            Name: req.body.name
        }, { new: true }).then(subcategory => {
            if (!subcategory) {
                return res.status(404).send({
                    message: "subCategory not found with id " + req.params.subCategoryId
                });
            }
           res.send({
            subCategory: subcategory
           }); 
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "subCategory not found with id " + req.params.subCategoryId
                });
            }
            return res.status(500).send({
                message: "Error updating subCategory with id " + req.params.subCategoryId
            });
        });
    },
    deletesubCategory(req, res) {
        
        subCategorySchema.findByIdAndDelete(req.params.subCategoryId).then(subcategory => {
            if (!subcategory) {
                return res.status(404).send({
                    message: "subCategory not found with id " + req.params.subCategoryId
                });
            }
            res.status(200).send({
                message: "subCategory deleted successfully."
            });
        }).catch(err => {
            if (err.kind == 'ObjectId' || errname === 'NotFound') {
                return res.status(404).send({
                    message: "subCategory not found with id " + req.params.subCategoryId
                });
            }
            return res.status(500).send({
                message: "Could not delete subCategory with id " + req.params.subCategoryId
            });
        });
    }
}
