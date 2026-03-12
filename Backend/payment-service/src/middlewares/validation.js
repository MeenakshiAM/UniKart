const Joi = require('joi');

const validateCreateOrder = (req, res, next) => {
  const schema = Joi.object({
    orderId: Joi.string().required(),
    amount: Joi.number().positive().required(),
    currency: Joi.string().optional().default('INR')
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }

  next();
};

const validatePaymentConfirmation = (req, res, next) => {
  const schema = Joi.object({
    razorpayOrderId: Joi.string().required(),
    razorpayPaymentId: Joi.string().required(),
    razorpaySignature: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }

  next();
};

module.exports = {
  validateCreateOrder,
  validatePaymentConfirmation
};
