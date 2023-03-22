const express = require('express');
const Controller=require("../MyController/userLocationController")
const router = express.Router()
router.get('/get',Controller.getuserLocation);
module.exports = router