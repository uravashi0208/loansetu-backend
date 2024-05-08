const LeadStatus = require("../model/leadstatus");
const messages = require("../constant/message");

exports.getAllLeadStatus = (req, res, next) => {
  LeadStatus.find({})
    .sort({ createdAt: -1 })
    .then((foundLeadStatus) => {
      if (foundLeadStatus) {
        res.json({
          response: true,
          data: foundLeadStatus,
        });
      } else {
        res.json({
          response: false,
          message: messages.NO_DATA_FOUND,
        });
      }
    });
};

exports.addLeadStatus = async (req, res, next) => {
  try {
    // Check if email or phone number already exists
    const existingLeasStatus = await LeadStatus.findOne({
      lead_status: { $regex: new RegExp(req.body.lead_status, "i") },
    });

    if (existingLeasStatus) {
      return res.json({
        response: false,
        message: messages.RECORD_EXIST,
      });
    }

    const updatedData = {
      lead_status: req.body.lead_status,
    };

    await LeadStatus.create(updatedData);
    res.json({
      response: true,
      message: messages.ADD_LEAD_STATUS,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteLeadStatus = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const deletedLeadStatus = await LeadStatus.findByIdAndDelete(_id);
    if (!deletedLeadStatus) {
      res.json({ response: false, message: messages.NO_DATA_FOUND });
    } else {
      res.json({
        response: true,
        message: messages.DELETE_LEAD_STATUS,
      });
    }
  } catch (error) {
    return next(error);
  }
};

exports.getLeadStatusById = async (req, res) => {
  try {
    const _id = req.params.id;
    const leadstatus = await LeadStatus.findById(_id);
    if (!leadstatus) {
      return res.json({ response: false, message: messages.NO_DATA_FOUND });
    }
    res.json({
      response: true,
      data: leadstatus,
    });
  } catch (error) {
    res.json({ response: false, errors: error });
  }
};

exports.updateLeadStaus = (req, res) => {
  const _id = req.params.id;
  const lead_status = req.body.lead_status;
  LeadStatus.findByIdAndUpdate(_id, {
    lead_status: lead_status,
  })
    .then((leadstatus) => {
      if (!leadstatus) {
        res.json({ response: false, message: messages.NO_DATA_FOUND });
      } else {
        res.json({
          response: true,
          data: leadstatus,
          message: messages.UPDATE_LEAD_STATUS,
        });
      }
    })
    .catch((error) => {
      res.json({ response: false, errors: error });
    });
};
