
const router=require("express").Router();

const Controller=require("../controller/ComplainController")

router.get("/get",Controller.getComplain)

router.route("/get/single/details/:id").get(Controller.getSingleComplaintDetails)

router.route('/create').post(Controller.createComplain)

router.route('/delete/:id').delete(Controller.deleteComplain)

router.route('/update/:id').put(Controller.updateComplain)

router.get('/alldata/all',Controller.allData)

router.put("/update/assigned/engineer/:id",Controller.updateAssignEngineer)

router.get('/get/search/:key',Controller.getAllComplaintOfaUser)

module.exports=router