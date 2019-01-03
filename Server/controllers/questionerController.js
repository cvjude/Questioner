import meetups from '../data/meetups';

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
}

export default questioner;
