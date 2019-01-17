/* eslint-disable linebreak-style */
import Utils from '../helper/Utilities';
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
    * @description Delete's a meetup Record
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    * @memberof questionerController
    */

  static async deleteMeeupRecord(req, res) {
    try {
      const data = await pool.query('SELECT title FROM meetups where id = $1', [req.params.id]);
      const deleted = await pool.query('DELETE FROM meetups WHERE id = $1', [req.params.id]);
      if (!deleted.rowCount) {
        return res.status(404).json({
          status: 404,
          message: 'Meetup not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: [`deleted meetup ${data.rows[0].title}`],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        response: 'Server error',
      });
    }
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
    try {
      const response = await pool.query('SELECT id, title, location, happeningon, tags FROM meetups WHERE id = $1', [req.params.id]);
      if (response.rowCount >= 1) {
        return res.status(200).json({
          status: 200,
          data: response.rows,
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'meetup not found',
      });
    
    } catch (err) {
      return res.status(500).json({
        status: 500,
        response: 'Server error',
      });
    }
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
    try {
      const response = await pool.query('SELECT id, title, happeningon, location, tags from meetups');

      return res.status(200).json({
        status: 200,
        data: response.rows,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        response: 'Server error',
      });
    }
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
      data: GetDataSpec.getUpComingSpec(response.rows),
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
    try {
      const {
        title, location, happeningOn, images, tags,
      } = req.body;

      const createdOn = new Date().toString();
      const happeningon = new Date(happeningOn).toString();
      const date = new Date(happeningOn).getTime();
      let img = '{}';
      let tag = '{}';
      if (images) { img = JSON.stringify(images).replace(/\[/g, '{').replace(/\]/g, '}'); }
      if (tags) { tag = JSON.stringify(tags).replace(/\[/g, '{').replace(/\]/g, '}'); }

      if (date < new Date().getTime()) {
        return res.status(400).json({
          status: 400,
          error: 'Invalid meetup, meetup should not be in the past',
        });
      }

      const meetupRecord = {
        text: 'INSERT INTO meetups (title, location, happeningon, images, createdon, tags) VALUES($1, $2, $3, $4, $5, $6) RETURNING title, location, happeningon, tags',
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
        data: dataArray.rows,
      });
    } catch (err) {
      res.status(400).json({
        status: 500,
        error: err,
      });
    }
    return true;
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
    try {
      const TokenObj = Utils.decoder(req, res);
      const {
        title, body, meetup,
      } = req.body;
      const createdOn = new Date().toString();
      const votes = 0;
      const createdby = TokenObj.id;

      const questionRecord = {
        text: 'INSERT INTO questions (createdOn, createdby, meetupid, title, body, votes) VALUES($1, $2, $3, $4, $5, $6)',
        values: [
          createdOn,
          createdby,
          meetup,
          title,
          body,
          votes,
        ],
      };

      await pool.query(questionRecord);
      const user = createdby;
      const obj = {
        user, meetup, title, body,
      };

      return res.status(201).json({
        status: 201,
        data: [obj],
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
    try {
      const TokenObj = Utils.decoder(req, res);
      const question = req.params.id;
      const response = await pool.query('SELECT * FROM questions WHERE id = $1', [question]);

      let upvote = 0;
      let downvote = 0;

      if (response.rowCount >= 1) {
        const user = await pool.query('SELECT * FROM votes WHERE userid = $1', [TokenObj.id]);

        if (user.rowCount === 0) {
          const newUser = {
            text: 'INSERT INTO votes (questionid, userid, upvote, downvote) VALUES($1, $2, $3, $4)',
            values: [question, TokenObj.id, 0, 0],
          };
          await pool.query(newUser);
        }

        if (req.url.endsWith('upvote')) {
          if (user.rows[0].upvote === 1) { await pool.query('UPDATE votes set upvote = 0, downvote = 0 Where userid = $1', [TokenObj.id]); } else { await pool.query('UPDATE votes set upvote = 1, downvote = 0 Where userid = $1', [TokenObj.id]); }
        } if (req.url.endsWith('downvote')) {
          if (user.rows[0].downvote === 1) { await pool.query('UPDATE votes set downvote = 0, upvote = 0 Where userid = $1', [TokenObj.id]); } else if (user.rows[0].downvote === 0) { await pool.query('UPDATE votes set downvote = 1, upvote = 0 Where userid = $1', [TokenObj.id]); }
        }

        upvote = await pool.query('SELECT SUM (upvote) from votes Where questionid = $1', [question]);
        downvote = await pool.query('SELECT SUM (downvote) from votes Where questionid = $1', [question]);
        let vote = upvote.rows[0].sum - downvote.rows[0].sum;

        if (vote < 0) { vote = 0; }

        const dataArray = await pool.query(`UPDATE questions set votes = ${vote} Where id = $1 RETURNING meetupid, title, body, votes`, [question]);
        const {
          meetupid, title, body, votes,
        } = dataArray.rows[0];
        const meetup = meetupid;

        const obj = {
          meetup, title, body, votes,
        };

        return res.status(200).json({
          status: 200,
          data: [obj],
        });
      }

      return res.status(404).json({
        status: 404,
        error: 'question not found',
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        response: 'Server error',
      });
    }
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
    try {
      const TokenObj = Utils.decoder(req, res);
      const {
        status,
      } = req.body;
      const meetupRecord = await pool.query('SELECT * FROM meetups WHERE id = $1', [req.params.id]);
      if (meetupRecord.rowCount >= 1) {
        const rsvp = {
          text: 'INSERT INTO rsvp (userid, meetupid, status) VALUES($1, $2, $3)',
          values: [TokenObj.id, req.params.id, status],
        };
        await pool.query(rsvp);

        const meetup = meetupRecord.rows[0].id;
        const topic = meetupRecord.rows[0].title;
        const obj = { meetup, topic, status };

        return res.status(200).json({
          status: 200,
          data: [obj],
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

  /**
    * @static
    * @description upvote vote a question
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    * @memberof questionerController
    */

  static async commentAQuestion(req, res) {
    try {
      const TokenObj = Utils.decoder(req, res);
      const { questionid } = req.body;
      const response = await pool.query('SELECT * FROM questions WHERE id = $1', [questionid]);

      const { comment } = req.body;

      if (response.rowCount >= 1) {
        const commentRecord = {
          text: 'INSERT INTO comments(userid, questionid, comment) VALUES($1, $2, $3) RETURNING *',
          values: [
            TokenObj.id,
            questionid,
            comment,
          ],
        };
        const { title, body } = response.rows[0];
        const obj = {
          questionid, title, body, comment,
        };

        await pool.query(commentRecord);

        return res.status(201).json({
          status: 201,
          data: [obj],
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'question not found',
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        response: 'Server error',
      });
    }
  }
}

export default Questioner;
