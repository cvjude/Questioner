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

  describe('/PATCH votes', () => {
    it('user should be able to upvote a question', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .patch('/questions/1')
        .send({ vote: 'true' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it('user should not vote if vote field is blank', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .patch('/questions/1')
        .send({ vote: '' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.message).to.equal('No blanck fields');
          done();
        });
    });


    it('user should be able to upvote a question', (done) => {
      const votes = questions[0].votes;
      chai.request('http://localhost:5001/api/v1')
        .patch('/questions/1')
        .send({ vote: 'true' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal(200);
          expect(res.body.data.votes).to.equal(votes + 1);
          done();
        });
    });

    it('user should be able to downvote a question', (done) => {
      const votes = questions[0].votes;
      chai.request('http://localhost:5001/api/v1')
        .patch('/questions/1')
        .send({ vote: 'false' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal(200);
          expect(res.body.data.votes).to.equal(votes - 1);
          done();
        });
    });
  });
});
