const express = require('express');
const { createComplaintLogs } = require('../controller/complaintLogsController');
const Controller=require("../controller/complaintLogsController")
const router = express.Router()


router.get('/get',Controller.getComplaintLogs);

router.post('/create',createComplaintLogs)

module.exports = router