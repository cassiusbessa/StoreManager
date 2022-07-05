const Joi = require('joi');

const salesSchema = Joi.object({
  productId: Joi.number().required().message('500').messages({
    'any.required': '"productId" is required',
  }),
  quantity: Joi.number().required().min(1).messages({
    'any.required': '"quantity" is required',
    'number.min': '"quantity" must be greater than or equal to 1',
  }),
});

module.exports = salesSchema;