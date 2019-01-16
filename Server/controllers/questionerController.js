import GetDataSpec from '../helper/getDataSpec';
import pool from '../config/config';

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

  static async getMeetUpRecord(req, res) {
    const response = await pool.query('SELECT * FROM meetups WHERE id = $1', [req.params.id]);

    if (response.rowCount >= 1) {
      const {
        id, title, location, happeingOn, tags,
      } = response.rows[0];

      const obj = {
        id, title, location, happeingOn, tags,
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

  static async getAllMeetUpRecords(req, res) {
    const response = await pool.query('SELECT * from meetups');

    return res.status(200).json({
      status: 200,
      data: GetDataSpec.getMeetupSpec(response.rows),
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

  static async getUpComingMeetUpRecords(req, res) {
    const response = await pool.query('SELECT * from meetups');

    return res.status(200).json({
      status: 200,
      data: GetDataSpec.getUpComingSpec(response.row),
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

  static async createMeetUpRecord(req, res) {
    const {
      title, location, happeningOn, images, tags,
    } = req.body;

    const createdOn = new Date().toString();
    const happeningon = new Date(happeningOn).toString();
    const date = new Date(happeningOn).getTime();
    const img = JSON.stringify(images).replace(/\[/g, '{').replace(/\]/g, '}');
    const tag = JSON.stringify(tags).replace(/\[/g, '{').replace(/\]/g, '}');

    if (date < new Date().getTime()) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid meetup, meetup should not be in the past',
      });
    }

    try {
      const meetupRecord = {
        text: 'INSERT INTO meetups (title, location, happeningon, images, createdon, tags) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
        values: [
          title,
          location,
          happeningon,
          img,
          createdOn,
          tag,
        ],
      };

      const dataArray = await pool.query(meetupRecord);

      return res.status(201).json({
        status: 201,
        data: GetDataSpec.getMeetupSpec(dataArray.rows, false),
      });
    } catch (err) {
      res.status(400).json({
        status: 500,
        error: err,
      });
    }
  }

  /**
    * @static
    * @description creates a question
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    * @memberof questionerController
    */

  static async createQuestionRecord(req, res) {
    const {
      title, body, meetup, user,
    } = req.body;
    const createdOn = new Date().toString();
    const votes = 0;
    const createdby = user;

    try {
      const questionRecord = {
        text: 'INSERT INTO questions (createdOn, createdby, meetupid, title, body, votes) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
        values: [
          createdOn,
          createdby,
          meetup,
          title,
          body,
          votes,
        ],
      };

      const dataArray = await pool.query(questionRecord);

      return res.status(201).json({
        status: 201,
        data: GetDataSpec.getQuestionSpec(dataArray.rows, false),
      });
    } catch (err) {
      res.status(400).json({
        status: 500,
        error: err,
      });
    }
  }


  /**
    * @static
    * @description upvote vote a question
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    * @memberof questionerController
    */

  static async voteAQuestion(req, res) {
    const response = await pool.query('SELECT * FROM votes WHERE questionid = $1', [req.params.id]);

    let upvote = 0;
    let downvote = 0;
    let votes = 0;

    if (response.rowCount >= 1) {
      if (req.url.endsWith('upvote')) {
        await pool.query('UPDATE votes set upvote = 1, downvote = 0 Where questionid = $1', [req.params.id]);
      } else {
        await pool.query('UPDATE votes set upvote = 0, downvote = 1 Where questionid = $1', [req.params.id]);
      }

      upvote = await pool.query('SELECT SUM (upvote) from votes');
      console.log(upvote.rows[0].sum);
      downvote = await pool.query('SELECT SUM (downvote) from votes');
      console.log(downvote.rows[0].sum);
      votes = upvote.rows[0].sum - downvote.rows[0].sum;
      if (votes < 0) { votes = 0; }
      const dataArray = await pool.query(`UPDATE questions set votes = ${votes} Where id = $1 RETURNING *`, [req.params.id]);

      return res.status(200).json({
        status: 200,
        data: GetDataSpec.getVoteSpec(dataArray.rows, false),
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

  static async upDateRsvp(req, res) {
    const {
      response, user,
    } = req.body;
    const meetupRecord = await pool.query('SELECT * FROM meetups WHERE id = $1', [req.params.id]);
    try {
      if (meetupRecord.rowCount >= 1) {
        const rsvp = {
          text: 'INSERT INTO rsvp (userid, meetupid, response) VALUES($1, $2, $3)',
          values: [1, user, response],
        };
        await pool.query(rsvp);

        const meetup = meetupRecord.rows[0].id;
        const topic = meetupRecord.rows[0].title;
        const obj = { meetup, topic, response };

        return res.status(200).json({
          status: 200,
          data: obj,
        });
      }

      return res.status(404).json({
        status: 404,
        error: 'meetup not found',
      });
    } catch (err) {
      res.status(400).json({
        status: 500,
        error: err,
      });
    }
  }
}

export default Questioner;
