const express = require('express');
const { createUser, loginUser, getUsers, deleteUser, getSingleUser, updateUser, updateUserPassword, updateIsApproval } = require('../controller/userController');
// const { createUser, loginUser } = require('../controller/userController')

const router = express.Router()


//create routes

router.route('/create').post(createUser);

router.route('/login').post(loginUser)

router.route('/get').get(getUsers)

router.route('/get/single/:id').get(getSingleUser)

router.route('/delete/:id').delete(deleteUser)

router.route('/update/:id').put(updateUser)

router.route('/update/password/:id').put(updateUserPassword)

router.route('/update/isActive/:id').put(updateIsApproval)


module.exports = router