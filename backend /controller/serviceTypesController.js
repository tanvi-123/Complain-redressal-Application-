const serviceType = require("../model/serviceTypes");
exports.getService = async (req, res) => {
  try {
    const service = await serviceType.find();
    res.json(service);
  } catch (error) {
    res.json({ message: error });
  }
};

//create complaint

exports.createService = async (req, res) => {
  const serviceData = {
    name: req.body.name,
    isActive: true,
    dateCreated: new Date(),
  };
  const service = await serviceType.create(serviceData);
  res.status(200).json({
    success: true,
    service,
  });
};

//update isActive
exports.updateIsActive = async (req, res) => {
  // console.warn(req.body);
  let service = await serviceType.updateOne(
    { _id: req.params.id },
    { $set: { isActive: req.body.isActive } },
    { new: true }
  );
  res.status(200).json({
    success: true,
    service,
  });
};


//get single service
exports.getSingleService = async (req, res) => {
  // console.warn(req.params.id);
  const service = await serviceType.findById(req.params.id);
  if (service) {
    res.status(200).json({
      success: true,
      service,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Service not found",
    });
  }
};
