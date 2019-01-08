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
          done();
        });
    });

    it('should get all upcoming meetup records', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .get('/upcomingmeetups')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal(200);
          done();
        });
    });


    it('should get a single meetup', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .get('/meetups/1')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect('1').to.equal(res.body.data.id);
          expect(res.body.status).to.equal(200);
          done();
        });
    });

    it('should not get a single meetup if id does not exist', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .get('/meetups/12')
        .end((err, res) => {
          expect(res.body.error).to.equal('meetup not found');
          expect(res.statusCode).to.equal(404);
          expect(res.body.status).to.equal(404);
          done();
        });
    });


    it('should not get a meetup with the id being a string', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .get('/meetups/d')
        .end((err, res) => {
          expect(res.body.error).to.equal('Id must be an integer');
          expect(res.statusCode).to.equal(403);
          expect(res.body.status).to.equal(403);
          done();
        });
    });
  });


  describe('/POST meetup', () => {
    it('admin should be able to add a new meetup record', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .post('/meetups')
        .send(newData[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          done();
        });
    });


    it('admin should not add a record if topic dont exist', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .post('/meetups')
        .send(testMeetups[1])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('No blank fields');
          done();
        });
    });

    it('admin should not add a record if location dont exist', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .post('/meetups')
        .send(testMeetups[2])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('No blank fields');
          done();
        });
    });

    it('admin should not add a record if happeningOn dont exist', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .post('/meetups')
        .send(testMeetups[3])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('No blank fields');
          done();
        });
    });

    it('admin should not add a record if tags dont exist', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .post('/meetups')
        .send(testMeetups[4])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('No blank fields');
          done();
        });
    });

    it('admin should not add a record if it already exists', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .post('/meetups')
        .send(testMeetups[5])
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.status).to.equal(403);
          expect(res.body.error).to.equal('meetup already exists');
          done();
        });
    });
  });


  describe('/POST questions', () => {
    it('user should be able to post a question', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .post('/questions')
        .send(newData[1])
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          done();
        });
    });


    it('user should not post if title field is blank', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .post('/questions')
        .send(testQuestions[1])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('No blank fields');
          done();
        });
    });


    it('user should not post if body field is blank', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .post('/questions')
        .send(testQuestions[2])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('No blank fields');
          done();
        });
    });


    it('user should not post if userid is not a number', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .post('/questions')
        .send(testQuestions[3])
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.status).to.equal(403);
          expect(res.body.error).to.equal('meetupid or userid must be integer');
          done();
        });
    });


    it('user should not post if meetupid is not a number', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .post('/questions')
        .send(testQuestions[4])
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.status).to.equal(403);
          expect(res.body.error).to.equal('meetupid or userid must be integer');
          done();
        });
    });

    it('user should not be able to post a question if it already exists', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .post('/questions')
        .send(testQuestions[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.status).to.equal(403);
          expect(res.body.error).to.equal('question already exists');
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
          expect(res.body.error).to.equal('No blank fields');
          done();
        });
    });


    it('user should not post if userid is not a number', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .post('/rsvp/1')
        .send(testRsvp[2])
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.status).to.equal(403);
          expect(res.body.error).to.equal('userid must be integer');
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
          expect(res.statusCode).to.equal(202);
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
          expect(res.body.error).to.equal('No blank fields');
          done();
        });
    });


    it('user should be able to upvote a question', (done) => {
      const votes = questions[0].votes;
      chai.request('http://localhost:5001/api/v1')
        .patch('/questions/1')
        .send({ vote: 'true' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(202);
          expect(res.body.status).to.equal(202);
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
          expect(res.statusCode).to.equal(202);
          expect(res.body.status).to.equal(202);
          expect(res.body.data.votes).to.equal(votes - 1);
          done();
        });
    });
  });
});