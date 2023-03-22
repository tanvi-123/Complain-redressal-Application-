const User = require("../model/userModel");
const bcrypt = require("bcrypt");

//create users

exports.createUser = async (req, res) => {
  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address1: req.body.address,
    pinCode: req.body.pinCode,
    phone: req.body.phone,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    userType: req.body.userType,
    serviceType:req.body.serviceType,
    isApproved:false,
    assignedEngineerToManager: req.body.assignedEngineerToManager,
    dateCreated: new Date(),
  };

  // let {name,email,password,contact,address,pincode,role} = req.body

  //  password =await bcrypt.hash(password,8)

  const user = await User.create(userData);

  res.status(200).json({
    success: true,
    user,
  });
  // console.warn(user);
};
//login user

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const user = await User.findOne({ email, password });
    //onsole.warn(user)
    if (user) {
      res.status(200).json({
        success: true,
        user,
      });
    } else {
      res.send("user not found");
    }
  } else {
    res.send("Please enter email and password");
  }
};

//getall user list
exports.getUsers = async (req, res) => {
  const user = await User.find();
  if (user) {
    res.status(200).json({
      success: true,
      user,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "User not found",
    });
  }
};

//get single user
exports.getSingleUser = async (req, res) => {
  // console.warn(req.params.id);
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json({
      success: true,
      user,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "User not found",
    });
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  let user = await User.findById(req.params.id);
  await user.remove();

  res.status(200).json({
    success: true,
    message: "product deleted succefully",
  });
};

//edit user

exports.updateUser = async (req, res) => {
  // console.warn(req.body);
  let user = await User.updateOne({ _id: req.params.id }, { $set: req.body });
  res.status(200).json({
    success: true,
    user,
  });
};

//edit user password

exports.updateUserPassword = async (req, res) => {
  // console.warn(req.body);
  let user = await User.updateOne(
    { _id: req.params.id },
    { $set: { password: req.body.password } },
    { new: true }
  );
  res.status(200).json({
    success: true,
    user,
  });
};

 //update isApproval
 exports.updateIsApproval = async (req, res) => {
  // console.warn(req.body);
  let user = await User.updateOne(
    { _id: req.params.id },
    { $set: { isApproved: req.body.isApproved } },
    { new: true }
  );
  res.status(200).json({
    success: true,
    user,
  });
};
