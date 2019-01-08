import Joi from 'joi';

const voteSchema = Joi.object().keys({
    vote: Joi.string().min(3).valid("upvote", "downvote").insensitive().required(),
});

export default voteSchema;