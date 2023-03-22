const Locations = require("../model/locationsModel");

//create location

exports.createLocation = async (req, res) => {
  const locationData = {
    area: req.body.area,
    pinCode: req.body.pinCode,
    isSelected:false,
    dateCreated: new Date(),
  };

  // let {name,email,password,contact,address,pincode,role} = req.body

  //  password =await bcrypt.hash(password,8)

  const location = await Locations.create(locationData);

  res.status(200).json({
    success: true,
    location,
  });
};

//getall location list
exports.getLocations = async (req, res) => {
  const location = await Locations.find();
  if (location) {
    res.status(200).json({
      success: true,
      location,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "location not found",
    });
  }
};

//delete location
exports.deleteLocation = async (req, res) => {
  let location = await Locations.findById(req.params.id);
  await location.remove();

  res.status(200).json({
    success: true,
    message: "product deleted succefully",
  });
};

//edit user

exports.updateLocation = async (req, res) => {
  // console.warn(req.body);
  let location = await Locations.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.status(200).json({
    success: true,
    location,
  });
};

//get single location
exports.getSingleLocation = async (req,res) => {
    // console.warn(req.params.id);
    const location = await Locations.findById(req.params.id)
    if(location){
        res.status(200).json({
            success:true,
            location
        })
    }
    else{
        res.status(400).json({
            success:false,
            message:"Location not found"
        })  
    }
}

