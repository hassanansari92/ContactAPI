const express = require('express');
const userMiddleware = require('../middlewares/users');
const middleware = require('../middlewares/subCategory');

let router = express.Router();
router
    .get('/', middleware.getsubCategory)
    .get('/:subCategoryId', middleware.getsubCategoryById)
    .post('/', middleware.saveCategory)
    .put('/:subCategoryId', middleware.updatesubCategory)
    .delete('/:subCategoryId', middleware.deletesubCategory)

module.exports = router;
