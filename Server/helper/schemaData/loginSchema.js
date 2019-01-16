import Joi from 'joi';

const loginSchema = Joi.object().keys({
  username: Joi.string().trim().min(3).required(),
  password: Joi.string().required(),
});

export default loginSchema;