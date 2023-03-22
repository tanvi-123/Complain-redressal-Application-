const express = require('express');
const Controller = require('../controller/problemTypesController');
const router = express.Router()


router.get('/get',Controller.getProblemTypes);

router.post('/create',Controller.createService)

router.route('/update/isActive/:id').put(Controller.updateIsActive)

module.exports = router