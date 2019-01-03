import meetups from '../data/meetups';
import questions from '../data/questions';


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
}

export default questioner;
