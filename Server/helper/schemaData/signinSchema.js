import Joi from 'joi';

const signinSchema = Joi.object().keys({
  username: Joi.string().trim().min(3).required(),
  password: Joi.required(),
});

export default siginSchema;