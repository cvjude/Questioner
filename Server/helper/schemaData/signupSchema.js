import Joi from 'joi';

const signupSchema = Joi.object().keys({
  firstname: Joi.string().trim().min(3).required(),
  lastname: Joi.string().trim().min(3).required(),
  othername: Joi.string().min(3),
  email: Joi.string().email().lowercase().required(),
  phoneNumber: Joi.string().regex(/^\d{4}-\d{3}-\d{4}$/),
  username: Joi.string().trim().min(3).required(),
  password: Joi.required(),
});

export default signupSchema;
