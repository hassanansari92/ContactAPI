const express = require('express');
const userMiddleware = require('../middlewares/users');
const middleware = require('../middlewares/person');

let router = express.Router();
router
    .get('/', middleware.getPerson)
    .get('/:subCategoryId', middleware.getPersonById)
    .post('/add', middleware.savePerson)
    .put('/:subCategoryId', middleware.updatePerson)
    .delete('/:subCategoryId', middleware.deletePerson)

module.exports = router;
