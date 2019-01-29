const mongo = require('mongodb')
//const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constants');
const categorySchema = require('../models/category');

module.exports = {
    saveCategory(req, res) {
        // Validate request
        if (!req.body.name) {
            return res.status(400).send({
                message: "Category Name can not be empty"
            });
        }

        // Create a Category
        const category = new categorySchema({
            Name: req.body.name
        });

        // Save Category in the database
        category.save()
            .then(data => {
                res.send(data); //Category: data
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Category."
                });
            });
    },
    getCategory(req, res) {
        categorySchema.find()
            .then(data => {
                res.send({
                    Categories: data
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving the Category."
                });
            });
    },
    getCategoryById(req, res) {
        categorySchema.findById(req.params.categoryId).then(category => {
            res.send({
                Category: category
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the Category."
            });
        });
    },
    updateCategory(req, res) {
        // Validate request
        if (!req.body.name) {
            return res.status(400).send({
                message: "Name can not be empty"
            });
        }

        // Find category and update it with the request body
        categorySchema.findByIdAndUpdate(req.params.categoryId, {
            Name: req.body.name
        }, { new: true }).then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.categoryId
                });
            }
           res.send({
            Category: category
           }); 
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.categoryId
                });
            }
            return res.status(500).send({
                message: "Error updating Category with id " + req.params.categoryId
            });
        });
    },
    deletecategory(req, res) {
        console.log(req.params.categoryId);
        categorySchema.findByIdAndDelete(req.params.categoryId).then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.categoryId
                });
            }
            res.status(200).send({
                message: "Category deleted successfully."
            });
        }).catch(err => {
            if (err.kind == 'ObjectId' || errname === 'NotFound') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.categoryId
                });
            }
            return res.status(500).send({
                message: "Could not delete category with id " + req.params.categoryId
            });
        });
    }
}
