import Joi from 'joi';

const rsvpSchema = Joi.object().keys({
    user: Joi.number().integer().required(),
    response: Joi.string().min(2).insensitive().valid("yes", "no", "maybe").required(),
});

export default rsvpSchema;