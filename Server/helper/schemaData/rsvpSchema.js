import Joi from 'joi';

const rsvpSchema = Joi.object().keys({
  status: Joi.string().min(2).insensitive().valid('yes', 'no', 'maybe').required(),
});

export default rsvpSchema;