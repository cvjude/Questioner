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
router.post('/auth/signup', Validate.validateSignup, User.signup);
router.post('/auth/login', Validate.validateLogin, User.login);

// meetup endpoints
router.get('/meetups/', Authenticate.authen, Questioner.getAllMeetUpRecords);
router.get('/meetups/upcoming/', Authenticate.authen, Questioner.getUpComingMeetUpRecords);
router.get('/meetups/:id', Validate.validateId, Authenticate.authen, Questioner.getMeetUpRecord);
router.post('/meetups', Validate.validateMeetUp, Authenticate.isAdmin, Questioner.createMeetUpRecord);

// Rsvp
router.post('/meetups/:id/rsvps', Validate.validateId, Validate.validateRsvp, Authenticate.isUser, Questioner.upDateRsvp);

// question endpoints
router.post('/comments/', Validate.validateComment, Authenticate.isUser, Questioner.commentAQuestion);
router.post('/questions', Validate.validateQuestion, Authenticate.isUser, Questioner.createQuestionRecord);
router.patch('/questions/:id/upvote', Validate.validateId, Authenticate.isUser, Questioner.voteAQuestion);
router.patch('/questions/:id/downvote', Validate.validateId, Authenticate.isUser, Questioner.voteAQuestion);

export default router;
