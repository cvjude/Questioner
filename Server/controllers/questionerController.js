import meetups from '../data/meetups';
import questions from '../data/questions';
import Rsvp from '../data/Rsvp';

/**
* @funcion
* @description gives a new objects according to the given specifications
* @memberof questionerController
*/
const getMeetupSpec = () => {
  const SpecArray = [];
  // for (const member of meetups) {
  meetups.forEach((member) => {
    const {
      id, title, location, happeningOn, tags,
    } = member;
    const obj = {
      id, title, location, happeningOn, tags,
    };
    SpecArray.push(obj);
  });
  return SpecArray;
};

/**
* @funcion
* @description gives a new objects according to the given specifications
* @memberof questionerController
*/
const getUpComingSpec = () => {
  const SpecArray = [];
  // for (const member of meetups) {
  meetups.forEach((member) => {
    if (member.happeningOn > new Date().toJSON()) {
      const {
        id, title, location, happeningOn, tags,
      } = member;
      const obj = {
        id, title, location, happeningOn, tags,
      };
      SpecArray.push(obj);
    }
  });
  return SpecArray;
};


class questioner {
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

    const {
      id, topic, location, happeingOn, tags,
    } = meetupRecord;

    const obj = {
      id, topic, location, happeingOn, tags,
    };

    if (meetupRecord) {
      return res.status(200).json({
        status: 200,
        data: obj,
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'meetup not found',
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
        return res.status(400).json({
          status: 400,
          message: 'meetup already exists',
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
    return res.status(200).json({
      status: 200,
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
        return res.status(400).json({
          status: 400,
          message: 'question already exists',
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
      createdOn: new Date(),
      user,
      votes: 0,
    };

    questions.push(questionRecord);
    return res.status(200).json({
      status: 200,
      data: obj,
    });
  }
}

export default questioner;
