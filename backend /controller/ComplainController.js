const Complain = require("../model/ComplainSchema");
const serviceType = require("../model/serviceTypes");

exports.getComplain = async (req, res) => {
  const complain = await Complain.find();
  if (complain) {
    res.send(complain);
  } else {
    res.send("data not found");
  }
};

//get all complaint of a user
// exports.getAllComplaintOfaUser = async (req, res) => {
//   // console.warn(req.params.key);
//   // res.send("user found")
//   const complain = await Complain.find({
//     "$or":[
//       {"userId":{$regex:req.params.key}}
//     ]
//   });
//   if (complain) {
//     res.status(200).json({
//       success: true,
//       complain,
//     });
//   } else {
//     res.send("data not found");
//   }
// };

// const mongoose = require('mongoose');
// const User = mongoose.model('User');
// const Post = mongoose.model('Post');

exports.getAllComplaintOfaUser = async (req, res) => {
  try {
    const complain = await Complain.aggregate([
      {
        $lookup: {
          from: "servicetypes",
          localField: "serviceTypeId",
          foreignField: "_id",
          as: "serviceData",
        },
      },
      {
        $lookup: {
          from: "problemtypes",
          localField: "problemTypeId",
          foreignField: "_id",
          as: "problemData",
        },
      },

      {
        $match: {
          $or: [{ userId: { $regex: req.params.key } }],
        },
      },
    ]);
    res.status(200).json(complain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create complaint

exports.createComplain = async (req, res) => {
  const complainData = {
    userId: req.body.userId,
    ticketNumber: req.body.ticketNumber,
    serviceTypeId: req.body.serviceTypeId,
    problemTypeId: req.body.problemTypeId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    pinCode: req.body.pinCode,
    phone: req.body.phone,
    description: req.body.description,
    status: "open",
    escalationDetails: "",
    assignUserId: "",
    fieldWorker: "",

    dateCreated: new Date(),
  };
  const complains = await Complain.create(complainData);
  res.json(complains);
  // console.log(complains);
};

exports.getSingleComplaintDetails = async (req, res) => {
  const user = await Complain.findById(req.params.id);
  if (!user) {
    res.status(400).json({
      success: false,
      error: "User is invalid",
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
};

exports.deleteComplain = async (req, res) => {
  let complain = await Complain.findById(req.params.id);
  await complain.remove();

  res.status(200).json({
    success: true,
    message: "product deleted succefully",
  });
};

//edit user

exports.updateComplain = async (req, res) => {
  // console.warn(req.body);
  let complain = await Complain.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.status(200).json({
    success: true,
    complain,
  });
};

//update Complaints

exports.updateAssignEngineer = async (req, res) => {
  // console.warn(req.params.id);

  let complaint = await Complain.updateOne(
    { _id: req.params.id },
    { $set: { assignUserId: req.body.assignUserId , status:req.body.status } },

    { new: true }
  );

  // console.warn(complain);
  res.status(200).json({
    success: true,
    complaint,
  });
};

//  schema joining
exports.allData = async (req, res) => {
  const searchTerm = req.params.searchTerm;

  try {
    const results = await Complain.aggregate([
      {
        $lookup: {
          from: "servicetypes",
          let: { serviceTypeId: { $toObjectId: "$serviceTypeId" } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$serviceTypeId"] } } },
          ],
          as: "serviceTypeData",
        },
      },
      {
        $lookup: {
          from: "problemtypes",
          let: { problemTypeId: { $toObjectId: "$problemTypeId" } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$problemTypeId"] } } },
          ],
          as: "problemTypeData",
        },
      },
    ]);

    res.send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
// end schema joining
