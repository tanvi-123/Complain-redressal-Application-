const express = require('express');
const Controller=require("../controller/serviceTypesController")
const router = express.Router()

//routes
router.get('/get',Controller.getService);

router.post('/create',Controller.createService)

router.route('/update/isActive/:id').put(Controller.updateIsActive)

router.route('/get/single/:id').get(Controller.getSingleService)

module.exports = router