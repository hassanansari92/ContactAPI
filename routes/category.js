const express = require('express');
const userMiddleware = require('../middlewares/users');
const middleware = require('../middlewares/category');

/**
 * @apiDefine CarNotFoundError
 * @apiError (Error: CarNotFound 400) CarNotFound <code>carId</code> is not valid.
 * @apiErrorExample {json} Car Not Found
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "code": 701,
 *     "error": "car_not_found"
 *   }
 */
let router = express.Router();
router
//.use(userMiddleware.checkLogin, userMiddleware.checkVerified, userMiddleware.checkIsCustomer)
/**
 * @api {get} /api/cars/manufacturers Get a list of manufacturers
 * @apiName CarManufacturers
 * @apiGroup Cars
 *
 * @apiUse ApplicationVersionParams
 * @apiUse AccessTokenParams
 * @apiSuccess {[Manufacturer]} manufacturers The manufacturers list
 * @apiSuccessExample {json} Success Response
 *   HTTP/1.1 200 OK
 *   {
 *     "manufacturers": [
 *       "Century",
 *       "Daihatsu",
 *       "Lexus",
 *       "Toyota"
 *     ]
 *   }
 *
 * @apiUse VersionTooOldError
 * @apiUse AuthRequiredError
 */
.get('/', middleware.getCategory)
/**
 * @api {get} /api/cars/models Get a list of models
 * @apiName CarModels
 * @apiGroup Cars
 *
 * @apiUse ApplicationVersionParams
 * @apiUse AccessTokenParams
 * @apiParam (Parameter) manufacturer The manufacturer to get the list of models from
 * @apiSuccess {[Models]} Models The models list
 * @apiSuccessExample {json} Success Response
 *   HTTP/1.1 200 OK
 *   {
 *     "models": [
 *       "CT200h",
 *       "ES250"
 *     ]
 *   }
 *
 * @apiUse VersionTooOldError
 * @apiUse AuthRequiredError
 * @apiError (Error: InvalidInput 400) MissingInfo <code>manufacturer</code> is not specified.
 * @apiUse InvalidInputErrorExample
 */
//.get('/models', middleware.getModels)
/**
 * @api {get} /api/cars/years Get a list of years
 * @apiName CarYears
 * @apiGroup Cars
 *
 * @apiUse ApplicationVersionParams
 * @apiUse AccessTokenParams
 * @apiParam (Parameter) manufacturer The manufacturer to get the list of years from
 * @apiParam (Parameter) model The model to get the list of years from
 * @apiSuccess {[Years]} Years The years list
 * @apiSuccessExample {json} Success Response
 *   HTTP/1.1 200 OK
 *   {
 *     "years": [
 *       2007,
 *       2008
 *     ]
 *   }
 * @apiUse VersionTooOldError
 * @apiUse AuthRequiredError
 * @apiError (Error: InvalidInput 400) MissingInfo <code>manufacturer</code> or <code>model</code> are not specified.
 * @apiUse InvalidInputErrorExample
 */
//.get('/years', middleware.getYears)
/**
 * @api {get} /api/cars/characteristics Get car characteristics for filtering
 * @apiName CarCharacteristics
 * @apiGroup Cars
 *
 * @apiUse ApplicationVersionParams
 * @apiUse AccessTokenParams
 * @apiSuccess {json} characteristics Array containing cars data
 * @apiSuccessExample {json} Success Response
 *   HTTP/1.1 200 OK
 *   {
 *     "characteristics": [{
 *       "manufacturer":"DAIHATSU",
 *       "image": "https://s3-us-west-2.amazonaws.com/aljoil-dev/pics/Daihatsu.jpg",
 *       "isPrivate": 0,
 *       "models": [{
 *         "name":"TERIOS",
 *         "years":[
 *           2005,
 *           2006
 *         ]
 *       }]
 *     }]
 *   }
 * @apiUse VersionTooOldError
 * @apiUse AuthRequiredError
 */
//.get('/characteristics', middleware.getCharacteristics)
/**
 * @api {get} /api/cars Get a list of cars
 * @apiName CarGetCars
 * @apiGroup Cars
 *
 * @apiUse ApplicationVersionParams
 * @apiUse AccessTokenParams
 * @apiParam (Parameter) manufacturer The manufacturer to get the list of cars from
 * @apiParam (Parameter) model The model to get the list of cars from
 * @apiParam (Parameter) year The year to get the list of cars from
 * @apiSuccess {[Cars]} Cars The cars list
 * @apiSuccessExample {json} Success Response
 *   HTTP/1.1 200 OK
 *   {
 *     "cars":[
 *       {
 *         "id":"583d85a11a7173511444b1e5",
 *         "manufacturer":"Lexus",
 *         "carModel":"GX460",
 *         "year":2015,
 *         "description":"GX460 4.6 Sports Utility 5Dr Petrol BB Automatic"
 *       }
 *     ]
 *   }
 * @apiUse VersionTooOldError
 * @apiUse AuthRequiredError
 * @apiError (Error: InvalidInput 400) MissingInfo <code>manufacturer</code>, <code>model</code> or <code>year</code> are not specified.
 * @apiUse InvalidInputErrorExample
 */
//.get('/', middleware.getCars)
/**
 * @api {get} /api/cars/:carId Get car details by id
 * @apiName CarGetCar
 * @apiGroup Cars
 *
 * @apiUse ApplicationVersionParams
 * @apiUse AccessTokenParams
 * @apiParam (Param) {String} carId The id of the car
 *
 * @apiSuccess {Car} car The returned car
 * @apiSuccessExample {json} Success Response
 *   HTTP/1.1 200 OK
 *   {
 *    "car":{
 *      "id":"5845580f0ad60e39ae204800",
 *      "manufacturer":"Century",
 *      "carModel":"Century",
 *      "year":2006,
 *      "description":"LUXURY 5.0 Sedan 4Dr Petrol  Automatic"
 *    }
 *  }
 *
 * @apiUse VersionTooOldError
 * @apiUse AuthRequiredError
 */
.get('/:categoryId', middleware.getCategoryById)
/**
 * @api {post} /api/cars/add Add a car to the user's cars list
 * @apiName CarAddCar
 * @apiGroup Cars
 *
 * @apiUse ApplicationVersionParams
 * @apiUse AccessTokenParams
 * @apiParam (Body) carId The id of the car to add to the list
 * @apiParam (Body) [label] A label to be added to the user's car (maybe the car number)
 * @apiSuccess {[Cars]} cars The full array of the user's cars
 * @apiSuccessExample {json} Success Response
 *   HTTP/1.1 200 OK
 *   {
 *    "cars": [
 *      {
 *        "id": "586372d0e1867e1e4a092b20",
 *        "car": {
 *          "id": "5857c9c42ea75523bb767031",
 *          "manufacturer": "Toyota",
 *          "carModel": "FJ Cruiser",
 *          "year": 2016,
 *          "description": "FJ2 4.0 Sports Utility 5Dr Petrol  Automatic",
 *          "quantityLitres": 8,
 *          "image": "https://s3-us-west-2.amazonaws.com/aljoil-dev/pics/Toyota.jpg"
 *        }
 *      }
 *    ]
 *  }
 *
 * @apiUse VersionTooOldError
 * @apiUse AuthRequiredError
 */
.post('/', middleware.saveCategory)
/**
 * @api {post} /api/cars/remove Remove a list of cars from the current user's cars
 * @apiName CarsRemove
 * @apiGroup Cars
 *
 * @apiUse ApplicationVersionParams
 * @apiUse AccessTokenParams
 * @apiParam (Param) {String[]} ids The id of the car to remove
 * @apiSuccess {[Cars]} cars The full array of the user's cars
 * @apiSuccessExample {json} Success Response
 *   HTTP/1.1 200 OK
 *   {
 *    "cars": [
 *      {
 *        "id": "586372d0e1867e1e4a092b20",
 *        "car": {
 *          "id": "5857c9c42ea75523bb767031",
 *          "manufacturer": "Toyota",
 *          "carModel": "FJ Cruiser",
 *          "year": 2016,
 *          "description": "FJ2 4.0 Sports Utility 5Dr Petrol  Automatic",
 *          "quantityLitres": 8,
 *          "image": "https://s3-us-west-2.amazonaws.com/aljoil-dev/pics/Toyota.jpg"
 *        }
 *      }
 *    ]
 *  }
 * @apiUse VersionTooOldError
 * @apiUse AuthRequiredError
 */
.put('/:categoryId', middleware.updateCategory)
.delete('/:categoryId', middleware.deletecategory)
//.post('/:carId/remove', middleware.removeCar)
//.get('/:carId/oil-filters', middleware.getOneCar, middleware.getOilFilters)

//.get('/:carId/services', middleware.getCarServices);

module.exports = router;
