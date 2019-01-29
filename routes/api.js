const express = require('express');

const person = require('./person');
const category = require('./category');
const subCategory = require('./subCategory');
const constants = require('../utils/constants');

const router = express.Router();

router.use('/person', person);
router.use('/category', category);
router.use('/subCategory', subCategory);
// router.use('/services', services);

/**
 * @api {get} /promotion Returns promotions if any
 * @apiName PromotionInfo
 * @apiGroup Promotion
 * @apiSuccess {Promotion} The promotion object
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 * {
 *   "promotion": {
 *     "awardedCredit": 80,
 *     "numberOfUsers": 500,
 *     "available": true
 *   }
 * }

router.get('/promotion', (req, res) => {
  res.json({
    // `available` is defined using `Object.defineProperty()` so calling `constants.promotion` doesn't return it
    promotion: {
      ...constants.promotion,
      available: constants.promotion.available
    }
  });
});
 */

module.exports = router;
