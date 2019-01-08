import express from 'express';
import Questioner from '../controllers/questionerController';
import Validate from '../helper/validator';

// the sub app using url versioning
const router = express();


router.get('/', Questioner.welcome);

// meetup endpoints
router.get('/meetups', Questioner.getAllMeetUpRecords);
router.get('/upcomingmeetups', Questioner.getUpComingMeetUpRecords);
router.get('/meetups/:id', Validate.validateId, Questioner.getMeetUpRecord);
router.post('/meetups', Validate.validateMeetUp, Questioner.createMeetUpRecord);

// Rsvp
router.post('/rsvp/:id', Validate.validateId, Validate.validateRsvp, Questioner.upDateRsvp);

// question endpoints

router.post('/questions', Validate.validateQuestion, Questioner.createQuestionRecord);
router.patch('/questions/:id', Validate.validateId, Validate.validateVote, Questioner.voteAQuestion);

export default router;
