const express = require('express');
const { createLocation, getLocations, deleteLocation, updateLocation, getSingleLocation } = require('../controller/locationsController');


const router = express.Router()


//create routes

router.route('/create').post(createLocation);

// router.route('/login').post(loginUser)

 router.route('/get').get(getLocations)

 router.route('/get/single/:id').get(getSingleLocation)

 router.route('/delete/:id').delete(deleteLocation)

 router.route('/update/:id').put(updateLocation)




module.exports = router