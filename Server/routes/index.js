import express from 'express';
import Questioner from '../controllers/questionerController';
import Validate from '../helper/validator';

// the sub app using url versioning
const router = express();


router.get('/', Questioner.welcome);

// meetup endpoints
router.get('/meetups/', Questioner.getAllMeetUpRecords);
router.get('/meetups/upcoming/', Questioner.getUpComingMeetUpRecords);
router.get('/meetups/:id', Validate.validateId, Questioner.getMeetUpRecord);
router.post('/meetups', Validate.validateMeetUp, Questioner.createMeetUpRecord);

// Rsvp
router.post('/meetups/:id/rsvps', Validate.validateId, Validate.validateRsvp, Questioner.upDateRsvp);

// question endpoints

router.post('/questions', Validate.validateQuestion, Questioner.createQuestionRecord);
router.patch('/questions/:id/upvote', Validate.validateId, Validate.validateVote, Questioner.voteAQuestion);
router.patch('/questions/:id/downvote', Validate.validateId, Validate.validateVote, Questioner.voteAQuestion);

export default router;
