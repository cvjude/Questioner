import Joi from 'joi';

const tagSchema = Joi.object().keys({
    tags: Joi.array().items(Joi.string()),
});

export default tagSchema;