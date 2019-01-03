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
    * @description Get all meetup record
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    * @memberof questionerController
    */

  static getAllMeetUpRecords(req, res) {
    return res.status(200).json({
      status: 200,
      data: getMeetupSpec(),
    });
  }
}

export default questioner;
