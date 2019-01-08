import Joi from 'joi';

const meetupSchema = Joi.object().keys({
    title: Joi.string().trim().min(3).required(),
    location: Joi.string().trim().min(3).required(),
    happeningOn: Joi.date().iso().required(),
    tags: Joi.array().items(Joi.string()),
});

export default meetupSchema;