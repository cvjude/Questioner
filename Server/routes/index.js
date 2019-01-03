import express from 'express';
import Questioner from '../controllers/questionerController';
import Validate from '../helper/validator';

// the sub app using url versioning
const router = express();


router.get('/', Questioner.welcome);

// meetup endpoints
router.get('/meetups/:id', Validate.AnInteger, Questioner.getMeetUpRecord);
router.post('/meetups', Validate.validateMeetUp, Questioner.createMeetUpRecord);

// question endpoints

router.post('/questions', Validate.validateQuestion, Questioner.createQuestionRecord);

export default router;
