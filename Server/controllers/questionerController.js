import meetups from '../data/meetups';
import Rsvp from '../data/Rsvp';



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
    * @respond to a meetup rsvp
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    * @memberof questionerController
    */

  static updateRsvp(req, res) {
    const meetupRecord = meetups.find(meetup => parseInt(meetup.id, 10) === Number(req.params.id));
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

    if (meetupRecord) {
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
      message: 'meetup not found',
    });
  }
}

export default questioner;
