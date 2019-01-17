import Joi from 'joi';

const commentSchema = Joi.object().keys({
    comment: Joi.string().trim().min(3).required(),
});

export default commentSchema;