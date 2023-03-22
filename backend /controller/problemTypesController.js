const problemTypes=require('../model/problemTypes')

exports.getProblemTypes=async(req,res)=>{
    try {
        const problem = await problemTypes.find();
        res.json(problem)
    } catch (error) {
        res.json(error)
    }
   
}

//create complaint

exports.createService = async (req, res) => {
    const problemData = {
      name: req.body.name,
      isActive: true,
      dateCreated: new Date(),
    };
    const problem = await problemTypes.create(problemData);
    res.status(200).json({
      success: true,
      problem,
    });
  };
  
  //update isActive
  exports.updateIsActive = async (req, res) => {
    // console.warn(req.body);
    let problem = await problemTypes.updateOne(
      { _id: req.params.id },
      { $set: { isActive: req.body.isActive } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      problem,
    });
  };
  