const LoanType = require("../model/loanType");
const messages = require("../constant/message");

exports.getAllLoanType = (req, res, next) => {
  LoanType.find({}).then((foundLoanType) => {
    if (foundLoanType) {
      res.json({
        response: true,
        data: foundLoanType,
      });
    } else {
      res.json({
        response: false,
        message: messages.NO_DATA_FOUND,
      });
    }
  });
};

exports.addLoanType = async (req, res, next) => {
  try {
    // Check if email or phone number already exists
    const existingLoanType = await LoanType.findOne({
      loan_type: { $regex: new RegExp(req.body.loan_type, "i") },
    });

    if (existingLoanType) {
      return res.json({
        response: false,
        message: messages.RECORD_EXIST,
      });
    }

    const updatedData = {
      loan_type: req.body.loan_type,
    };

    await LoanType.create(updatedData);
    res.json({
      response: true,
      message: messages.ADD_LOAN_TYPE,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteLoanType = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const deletedLoanType = await LoanType.findByIdAndDelete(_id);
    if (!deletedLoanType) {
      res.json({ response: false, message: messages.NO_DATA_FOUND });
    } else {
      res.json({
        response: true,
        message: messages.DELETE_LOAN_TYPE,
      });
    }
  } catch (error) {
    return next(error);
  }
};

exports.getLoanTypeById = async (req, res) => {
  try {
    const _id = req.params.id;
    const loanType = await LoanType.findById(_id);
    if (!loanType) {
      return res.json({ response: false, message: messages.NO_DATA_FOUND });
    }
    res.json({
      response: true,
      data: loanType,
    });
  } catch (error) {
    res.json({ response: false, errors: error });
  }
};

exports.updateLoanType = (req, res) => {
  const _id = req.params.id;
  const loan_type = req.body.loan_type;
  LoanType.findByIdAndUpdate(_id, {
    loan_type: loan_type,
  })
    .then((loanType) => {
      if (!loanType) {
        res.json({ response: false, message: messages.NO_DATA_FOUND });
      } else {
        res.json({
          response: true,
          data: loanType,
          message: messages.UPDATE_LOAN_TYPE,
        });
      }
    })
    .catch((error) => {
      res.json({ response: false, errors: error });
    });
};
