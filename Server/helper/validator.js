import Joi from 'joi';
import meetupSchema from './schemaData/meetupSchema';
import questionSchema from './schemaData/questionSchema';
import rsvpSchema from './schemaData/rsvpSchema';
import Util from './Utilities';

class Validate {
  /**
  * @static
  * @description Validates if the id is an integer
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @param {Object} next - Next function call
  * @memberof Controllers
  */

  static validateId(req, res, next) {
    if (Number.isInteger(Number(req.params.id))) {
      next();
    } else {
      return res.status(400).json({
        status: 400,
        error: 'Id must be an integer',
      });
    }
  }


  /**
  * @static
  * @description Validates a new meet up
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @param {Object} next - Next function call
  * @memberof Controllers
  */

  static validateMeetUp(req, res, next) {
    const {
      title, location, tags, happeningOn,
    } = req.body;

    const validateObject = {
      title, location, happeningOn, tags,
    };

    Joi.validate(validateObject, meetupSchema, (err) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: err.details[0].message,
        });
      }
      if (Util.stringIsNumber(title)) {
        res.status(400).json({
          status: 400,
          error: 'title should not be a number',
        });
      } else if (Util.stringIsNumber(location)) {
        res.status(400).json({
          status: 400,
          error: 'location should not be a number',
        });
      } else next();
    });
  }

  /**
  * @static
  * @description Validates a meetup question
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @param {Object} next - Next function call
  * @memberof Controllers
  */

  static validateQuestion(req, res, next) {
    const {
      title, body, user, meetup,
    } = req.body;

    const validateObject = {
      title, body, user, meetup,
    };

    Joi.validate(validateObject, questionSchema, (err) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: err.details[0].message,
        });
      }
      if (Util.stringIsNumber(title)) {
        res.status(400).json({
          status: 400,
          error: 'title should not be a number',
        });
      } else if (Util.stringIsNumber(body)) {
        res.status(400).json({
          status: 400,
          error: 'body should not be a number',
        });
      } else next();
    });
  }


  /**
  * @static
  * @description Validates an rsvp
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @param {Object} next - Next function call
  * @memberof Controllers
  */

  static validateRsvp(req, res, next) {
    const { response, user } = req.body;

    const validateObject = { response, user };

    Joi.validate(validateObject, rsvpSchema, (err) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: err.details[0].message,
        });
      }
      if (Util.stringIsNumber(response)) {
        res.status(400).json({
          status: 400,
          error: 'response should not be a number',
        });
      } else next();
    });
  }
}

export default Validate;
