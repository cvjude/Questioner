import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import meetups from '../data/meetups';
import testMeetups from './testdata/testMeetups';
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

  describe('/POST meetup', () => {
    it('admin should be able to add a new meetup record', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .post('/meetups')
        .send(newData[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
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
          expect(res.body.message).to.equal('No blanck fields');
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
          expect(res.body.message).to.equal('No blanck fields');
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
          expect(res.body.message).to.equal('No blanck fields');
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
          expect(res.body.message).to.equal('No blanck fields');
          done();
        });
    });

    it('admin should not add a record if it already exists', (done) => {
      chai.request('http://localhost:5001/api/v1')
        .post('/meetups')
        .send(testMeetups[5])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.message).to.equal('meetup already exists');
          done();
        });
    });
  });

});
