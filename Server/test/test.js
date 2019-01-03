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
    it('should get a single meetup', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .get('/meetups/1')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect('1').to.equal(res.body.data.id);
          expect(res.body.status).to.equal(200);
          if (err) return done(err);
          done();
        });
    });

    it('should not get a single meetup if id does not exist', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .get('/meetups/12')
        .end((err, res) => {
          expect(res.body.message).to.equal('meetup not found');
          expect(res.statusCode).to.equal(404);
          expect(res.body.status).to.equal(404);
          if (err) return done(err);
          done();
        });
    });


    it('should not get a meetup with the id being a string', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .get('/meetups/d')
        .end((err, res) => {
          expect(res.body.message).to.equal('Id must be an integer');
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal(400);
          if (err) return done(err);
          done();
        });
    });
  });
});
