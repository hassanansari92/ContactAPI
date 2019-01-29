const mongo = require('mongodb')
//const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constants');
const personSchema = require('../models/person');

module.exports = {
    savePerson(req, res) {
        let fName = req.body.FirstName;
        let lName = req.body.LastName;
        let email = req.body.Email;
        let addr = req.body.Address;
        let phone = req.body.PhoneNumber;
        let mobile = req.body.MobileNumber;
        let catId = req.body.CategoryId;
        let subCatId = req.body.SubCategoryId;

        // Validate request
        if (!fName || !mobile || !catId) {
            return res.status(400).send({
                message: "FirstName, Mobile or Category is madatory."
            });
        }

        // Create a person
        const person = new personSchema({
            FirstName: fName,
            LastName: lName,
            Email: email,
            Address: addr,
            PhoneNumber: phone,
            MobileNumber: mobile,
            CategoryId: catId,
            SubCategoryId: subCatId
        });

        // Save person in the database
        person.save()
            .then(data => {
                res.send({
                    person: data
                }); //person: data
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the person."
                });
            });
    },
    getPerson(req, res) {
        personSchema.find()
            .then(data => {
                res.send({
                    Categories: data
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving the person."
                });
            });
    },
    getPersonById(req, res) {
        personSchema.findById(req.params.personId).then(person => {
            res.send({
                person: person
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the person."
            });
        });
    },
    updatePerson(req, res) {
        // Validate request
        let fName = req.body.FirstName;
        let lName = req.body.LastName;
        let email = req.body.Email;
        let addr = req.body.Address;
        let phone = req.body.PhoneNumber;
        let mobile = req.body.MobileNumber;
        let catId = req.body.CategoryId;
        let subCatId = req.body.SubCategoryId;

        // Validate request
        if (!fName || !mobile || !catId) {
            return res.status(400).send({
                message: "FirstName, Mobile or Category is madatory."
            });
        }

        // Find person and update it with the request body
        personSchema.findByIdAndUpdate(req.params.personId, {
            FirstName: fName,
            LastName: lName,
            Email: email,
            Address: addr,
            PhoneNumber: phone,
            MobileNumber: mobile,
            CategoryId: catId,
            SubCategoryId: subCatId
        }, { new: true }).then(person => {
            if (!person) {
                return res.status(404).send({
                    message: "Person not found with id " + req.params.personId
                });
            }
           res.send({
            person: person
           }); 
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Person not found with id " + req.params.personId
                });
            }
            return res.status(500).send({
                message: "Error updating Person with id " + req.params.personId
            });
        });
    },
    deletePerson(req, res) {
        personSchema.findByIdAndDelete(req.params.personId).then(person => {
            if (!person) {
                return res.status(404).send({
                    message: "Person not found with id " + req.params.personId
                });
            }
            res.status(200).send({
                message: "Person deleted successfully."
            });
        }).catch(err => {
            if (err.kind == 'ObjectId' || errname === 'NotFound') {
                return res.status(404).send({
                    message: "Person not found with id " + req.params.personId
                });
            }
            return res.status(500).send({
                message: "Person not delete Contact with id " + req.params.personId
            });
        });
    }
}
