import meetups from '../data/meetups';
import questions from '../data/questions';
import Rsvp from '../data/Rsvp';
import GetDataSpec from '../helper/getDataSpec';

class Questioner {
  /**
    * @static
    * @description Display a welcome message
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    * @memberof questionerController
    */

  static welcome(req, res) {
    return res.status(200).json({ message: 'welcome to Jude\'s Questioner' });
  }

  /**
    * @static
    * @description Get a specific meetup record
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    * @memberof questionerController
    */

  static getMeetUpRecord(req, res) {
    const meetupRecord = meetups.find(meetup => parseInt(meetup.id, 10)
        === Number(req.params.id));


    if (meetupRecord) {
      const {
        id, topic, location, happeingOn, tags,
      } = meetupRecord;

      const obj = {
        id, topic, location, happeingOn, tags,
      };

      return res.status(200).json({
        status: 200,
        data: obj,
      });
    }

    return res.status(404).json({
      status: 404,
      error: 'meetup not found',
    });
  }

  /**
    * @static
    * @description Get all meetup record
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    * @memberof questionerController
    */

  static getAllMeetUpRecords(req, res) {
    return res.status(200).json({
      status: 200,
      data: GetDataSpec.getMeetupSpec(),
    });
  }

  /**
    * @static
    * @description Get all upcoming meetup records
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    * @memberof questionerController
    */

  static getUpComingMeetUpRecords(req, res) {
    return res.status(200).json({
      status: 200,
      data: GetDataSpec.getUpComingSpec(),
    });
  }

  /**
    * @static
    * @description creates a meetup record
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    * @memberof questionerController
    */

  static createMeetUpRecord(req, res) {
    const {
      topic, location, happeningOn, images, tags,
    } = req.body;

    for (const member of meetups) {
      if (member.topic === topic && member.happeningOn === happeningOn) {
        return res.status(403).json({
          status: 403,
          error: 'meetup already exists',
        });
      }
    }


    const meetupRecord = {
      id: meetups.length + 1,
      topic,
      location,
      happeningOn,
      images,
      createdOn: new Date().toJSON(),
      tags,
    };

    const obj = {
      topic, location, happeningOn, tags,
    };

    meetups.push(meetupRecord);
    return res.status(201).json({
      status: 201,
      data: obj,
    });
  }

  /**
    * @static
    * @description creates a question
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    * @memberof questionerController
    */

  static createQuestionRecord(req, res) {
    const {
      title, body, meetup, createdBy, user,
    } = req.body;

    for (const member of questions) {
      if (member.title === title && member.body === body) {
        return res.status(403).json({
          status: 403,
          error: 'question already exists',
        });
      }
    }

    const obj = {
      user, meetup, title, body,
    };

    const questionRecord = {
      id: questions.length + 1,
      title,
      meetup,
      body,
      createdBy,
      createdOn: new Date().toJSON(),
      user,
      votes: 0,
    };

    questions.push(questionRecord);
    return res.status(201).json({
      status: 201,
      data: obj,
    });
  }


  /**
    * @static
    * @description upvote or down vote a question
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    * @memberof questionerController
    */

  static voteAQuestion(req, res) {
    const questionRecord = questions.find(question => parseInt(question.id, 10)
        === Number(req.params.id));
    if (questionRecord) {
      const { vote } = req.body;
      if (vote === 'true') { questionRecord.votes++; } else if (vote === 'false') {
        questionRecord.votes--;
        if (questionRecord.votes < 0) {
          questionRecord.votes = 0;
        }
      } else {
        return res.status(406).json({
          status: 406,
          error: 'must be true or false',
        });
      }
      const {
        meetup, title, body, votes,
      } = questionRecord;

      const obj = {
        meetup, title, body, votes,
      };

      return res.status(202).json({
        status: 202,
        data: obj,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'question not found',
    });
  }


  /**
    * @static
    * @description respond to a meetup rsvp
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    * @memberof questionerController
    */

  static upDateRsvp(req, res) {
    const meetupRecord = meetups.find(meetup => parseInt(meetup.id, 10) === Number(req.params.id));

    if (meetupRecord) {
      const {
        user, response,
      } = req.body;

      const rsvpobj = {
        id: Rsvp.length + 1,
        topic: meetupRecord.topic,
        meetup: meetupRecord.id,
        status: response,
        user,
      };

      const obj = {
        meetup: meetupRecord.id,
        topic: meetupRecord.topic,
        status: response,
      };
      Rsvp.push(rsvpobj);
      return res.status(200).json({
        status: 200,
        data: obj,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'meetup not found',
    });
  }
}

export default Questioner;