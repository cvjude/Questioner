import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import meetups from '../data/meetups';
import questions from '../data/questions';
import Rsvp from '../data/Rsvp';
import testMeetups from './testdata/testMeetups';
import testQuestions from './testdata/testQuestions';
import newData from './testdata/newData';
import testRsvp from './testdata/testRsvp';


const { expect } = chai;

chai.use(chaiHttp);

describe('Questioner', () => {
  describe('/display welcome message', () => {
    it('display welcome message on start', (done) => {
      chai.request('http://localhost:5001/api/v1/')
        .get('/')
        .end((err, res) => {
          expect(res.body.message).to.equal('welcome to Jude\'s Questioner');
          expect(res.statusCode).to.equal(200);
          if (err) return done(err);
          done();
        });
    });
  });


  describe('/GET all the meetups', () => {
    it('should get all meetup records', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .get('/meetups')
        .end((err, res) => {
          expect(meetups.length).to.equal(res.body.data.length);
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal(200);
          if (err) return done(err);
          done();
        });
    });
});
