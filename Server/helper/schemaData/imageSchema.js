import Joi from 'joi';

const imageSchema = Joi.object().keys({
    images: Joi.array().items(Joi.string()),
});

export default imageSchema;