import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import testMeetups from './testdata/testMeetups';
import testQuestions from './testdata/testQuestions';
import newData from './testdata/newData';
import testRsvp from './testdata/testRsvp';


const { expect } = chai;

chai.use(chaiHttp);

describe('Questioner', () => {
  describe('/display welcome message', () => {
    it('display welcome message on start', (done) => {
      chai.request(app)
        .get('/api/v1/')
        .end((err, res) => {
          expect(res.body.message).to.equal('welcome to Jude\'s Questioner');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });


  describe('GET/api/v1/meetups', () => {
    it('/:id should get a single meetup', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/1')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(1).to.equal(res.body.data.id);
          expect(res.body.status).to.equal(200);
          done();
        });
    });

    it('/:id should not get a single meetup if id does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/12')
        .end((err, res) => {
          expect(res.body.error).to.equal('meetup not found');
          expect(res.statusCode).to.equal(404);
          expect(res.body.status).to.equal(404);
          done();
        });
    });


    it('/:id should not get a meetup with the id being a string', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/d')
        .end((err, res) => {
          expect(res.body.error).to.equal('Id must be an integer');
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal(400);
          done();
        });
    });
  });


  describe('/POST/api/v1/meetups', () => {
    it('admin should not add a record if title dont exist', (done) => {
      chai.request(app)
        .post('/api/v1/meetups')
        .send(testMeetups[1])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('"title" is not allowed to be empty');
          done();
        });
    });

    it('admin should not add a record if location dont exist', (done) => {
      chai.request(app)
        .post('/api/v1/meetups')
        .send(testMeetups[2])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('"location" is not allowed to be empty');
          done();
        });
    });

    describe('/POST/api/v1/questions', () => {
      it('user should be able to post a question', (done) => {
        chai.request(app)
          .post('/api/v1/questions')
          .send(newData[1])
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            done();
          });
      });


      it('user should not post if title field is blank', (done) => {
        chai.request(app)
          .post('/api/v1/questions')
          .send(testQuestions[1])
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.status).to.equal(400);
            expect(res.body.error).to.equal('"title" is not allowed to be empty');
            done();
          });
      });


      it('user should not post if body field is blank', (done) => {
        chai.request(app)
          .post('/api/v1/questions')
          .send(testQuestions[2])
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.status).to.equal(400);
            expect(res.body.error).to.equal('"body" is not allowed to be empty');
            done();
          });
      });


      it('user should not post if userid is not a number', (done) => {
        chai.request(app)
          .post('/api/v1/questions')
          .send(testQuestions[3])
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.status).to.equal(400);
            expect(res.body.error).to.equal('"user" must be a number');
            done();
          });
      });


      it('user should not post if meetupid is not a number', (done) => {
        chai.request(app)
          .post('/api/v1/questions')
          .send(testQuestions[4])
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.status).to.equal(400);
            expect(res.body.error).to.equal('"meetup" must be a number');
            done();
          });
      });
    });

    describe('/POST/api/v1/meetups/:id/rsvps', () => {
      it('user should not post if response field is blank', (done) => {
        chai.request(app)
          .post('/api/v1/meetups/1/rsvps')
          .send(testRsvp[1])
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.status).to.equal(400);
            expect(res.body.error).to.equal('"response" is not allowed to be empty');
            done();
          });
      });


      it('user should not post if userid is not a number', (done) => {
        chai.request(app)
          .post('/api/v1/meetups/1/rsvps')
          .send(testRsvp[2])
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.status).to.equal(400);
            expect(res.body.error).to.equal('"user" must be a number');
            done();
          });
      });
    });
  });
});
