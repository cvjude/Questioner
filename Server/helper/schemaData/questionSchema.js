import Joi from 'joi';

const questionSchema = Joi.object().keys({
    user: Joi.number().integer().required(),
    meetup: Joi.number().integer().required(),
    title: Joi.string().trim().min(3).required(),
    body: Joi.string().trim().min(3).required(),
});

export default questionSchema;