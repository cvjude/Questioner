import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import testMeetups from './testdata/testMeetups';
import testQuestions from './testdata/testQuestions';
import newData from './testdata/newData';
import testRsvp from './testdata/testRsvp';
import userData from './testdata/userData';
let adminToken;
let userToken;


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

  describe('POST/api/v1/auth/signup ', () => {
    it('should not sign up an already existing user', (done) => {
      chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userData[0])
      .end((err, res) => {
          expect(res.status).to.equal(409);
          done();
      });
    });

    it('should sign up a new user', (done) => {
      chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userData[1])
      .end((err, res) => {
          expect(res.status).to.equal(201);
          userToken = res.body.data[0].token;
          done();
      });
    });

    it('should not sign up a new user if username is invalid', done => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(userData[2])
        .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
        });
    });

  });    

  describe('POST/api/v1/auth/login ', () => {
    it('should login an existing user', (done) => {
      chai.request(app)
      .post('/api/v1/auth/login')
      .send(userData[0])
      .end((err, res) => { 
          expect(res.status).to.equal(200);
          adminToken = res.body.data[0].token;
          done();
      });
    });

    it('should not login if user name is invalid', (done) => {
      chai.request(app)
      .post('/api/v1/auth/login')
      .send(userData[3])
      .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
      });
    });

    it('should not login if password is invalid', done => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(userData[4])
        .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
        });
    });

  }); 

  describe('GET/api/v1/meetups', () => {
    it('/:id should get a single meetup', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/1')
        .set('authorization', `Bearer ${ adminToken }`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it('/:id should get all meetup records', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/')
        .set('authorization', `Bearer ${ adminToken }`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it('/:id should get all upcoming meetup records', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/upcoming')
        .set('authorization', `Bearer ${ adminToken }`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it('/:id should not get all meetup records if credentails are wrong', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/upcoming')
        .set('authorization', `Bearer ${ userToken }`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
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
          .set('Authorization', `Bearer ${ userToken }`)
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
      it('user should not post if status field is blank', (done) => {
        chai.request(app)
          .post('/api/v1/meetups/1/rsvps')
          .send(testRsvp[1])
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.status).to.equal(400);
            expect(res.body.error).to.equal('"status" is required');
            done();
          });
      });

    });
  });
});
