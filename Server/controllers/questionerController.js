import meetups from '../data/meetups';
import questions from '../data/questions';
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
    * @upvote or down vote a question
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    * @memberof questionerController
    */

  static voteAQuestion(req, res) {
    const questionRecord = questions.find(question => parseInt(question.id, 10)
        === Number(req.params.id));
    const { vote } = req.body;
    if (questionRecord) {
      if (vote === 'true') { questionRecord.votes += 1; } else if (vote === 'false') {
        questionRecord.votes -= 1;
        if (questionRecord.votes < 0) {
          questionRecord.votes = 0;
        }
      } else {
        return res.status(400).json({
          status: 400,
          message: 'must be true or false',
        });
      }
      const {
        meetup, title, body, votes,
      } = questionRecord;

      const obj = {
        meetup, title, body, votes,
      };

      return res.status(200).json({
        status: 200,
        data: obj,
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'question not found',
    });
  }
}

export default questioner;
