const complaintsLogs = require("../Model/complaintsLogs");

exports.getComplaintLogs = async (req, res) => {
  try {
    const logs = await complaintsLogs.find();
    res.json(logs);
  } catch (error) {
    res.json({ message: error });
  }
};

exports.createComplaintLogs = async (req, res) => {
  const complainData = {
    complaintId: req.body.complaintId,
    description: req.body.description,
    assignedEng: req.body.assignedEng,
    status: req.body.status,
    dateCreated: new Date(),
  };

  const complains = await complaintsLogs.create(complainData);
  res.json(complains);
};
