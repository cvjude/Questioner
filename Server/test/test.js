import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import questions from '../data/questions';
import testQuestions from './testdata/testQuestions';
import newData from './testdata/newData';

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


  describe('/POST questions', () => {
    it('user should be able to post a question', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .post('/questions')
        .send(newData[1])
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
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
          expect(res.body.message).to.equal('No blanck fields');
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
          expect(res.body.message).to.equal('No blanck fields');
          done();
        });
    });


    it('user should not post if userid is not a number', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .post('/questions')
        .send(testQuestions[3])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.message).to.equal('meetupid or userid must be integer');
          done();
        });
    });


    it('user should not post if meetupid is not a number', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .post('/questions')
        .send(testQuestions[4])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.message).to.equal('meetupid or userid must be integer');
          done();
        });
    });

    it('user should not be able to post a question if it already exists', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .post('/questions')
        .send(testQuestions[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.message).to.equal('question already exists');
          done();
        });
    });
  });

});
