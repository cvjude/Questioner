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

  describe('/POST Rsvp', () => {
    it('user should be able to post rsvp', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .post('/rsvp/1')
        .send(testRsvp[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it('user should not post if response field is blank', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .post('/rsvp/1')
        .send(testRsvp[1])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.message).to.equal('No blanck fields');
          done();
        });
    });


    it('user should not post if userid is not a number', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .post('/rsvp/1')
        .send(testRsvp[2])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.message).to.equal('userid must be integer');
          done();
        });
    });
  });
});
