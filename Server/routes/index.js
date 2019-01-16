import express from 'express';
import Questioner from '../controllers/questionerController';
import Validate from '../Middleware/validator';
import User from '../controllers/userController';
import Authenticate from '../Middleware/UserAuth';

// the sub app using url versioning
const router = express();

router.get('/', Questioner.welcome);

// Admin route
router.delete('/meetups/:id', Authenticate.isAdmin, Questioner.deleteMeeupRecord);

// user endpoints
router.post('/auth/signup', Validate.validateId, Validate.validateSignup, User.signup);
router.post('/auth/login', Validate.validateLogin, User.login);

// meetup endpoints
router.get('/meetups/', Questioner.getAllMeetUpRecords);
router.get('/meetups/upcoming/', Questioner.getUpComingMeetUpRecords);
router.get('/meetups/:id', Validate.validateId, Questioner.getMeetUpRecord);
router.post('/meetups', Validate.validateMeetUp, Questioner.createMeetUpRecord);

// Rsvp
router.post('/meetups/:id/rsvps', Validate.validateId, Validate.validateRsvp, Questioner.upDateRsvp);

// question endpoints

router.post('/questions', Validate.validateQuestion, Questioner.createQuestionRecord);
router.patch('/questions/:id/upvote', Validate.validateId, Questioner.voteAQuestion);
router.patch('/questions/:id/downvote', Validate.validateId, Questioner.voteAQuestion);

export default router;
