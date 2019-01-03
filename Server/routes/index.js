import express from 'express';
import Questioner from '../controllers/questionerController';
import Validate from '../helper/validator';

// the sub app using url versioning
const router = express();


router.get('/', Questioner.welcome);

// Rsvp
router.post('/rsvp/:id', Validate.AnInteger, Validate.validateRsvp, Questioner.updateRsvp);


export default router;
