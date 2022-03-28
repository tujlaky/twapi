const { Joi } = require('express-validation');

module.exports = {
  postValidation: {
    body: Joi.object({
      message: Joi.string().required(),
    })
  }
};
