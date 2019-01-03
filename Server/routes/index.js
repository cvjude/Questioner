import express from 'express';
import Questioner from '../controllers/questionerController';
import Validate from '../helper/validator';

// the sub app using url versioning
const router = express();


router.get('/', Questioner.welcome);

// question endpoints

router.patch('/questions/:id', Validate.AnInteger, Validate.validateVote, Questioner.voteAQuestion);

export default router;
