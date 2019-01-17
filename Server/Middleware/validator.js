import Joi from 'joi';
import meetupSchema from '../helper/schemaData/meetupSchema';
import questionSchema from '../helper/schemaData/questionSchema';
import rsvpSchema from '../helper/schemaData/rsvpSchema';
import signupSchema from '../helper/schemaData/signupSchema';
import loginSchema from '../helper/schemaData/loginSchema';
import CommentSchema from '../helper/schemaData/commentSchema';
import tagSchema from '../helper/schemaData/tagSchema';
import imageSchema from '../helper/schemaData/imageSchema';
import Util from '../helper/Utilities';

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
  * @description Validates a signup request
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @param {Object} next - Next function call
  * @memberof Controllers
  */

  static validateSignup(req, res, next) {
    const {
      firstname, lastname, othername, email, phoneNumber, username, password,
    } = req.body;

    const validateObject = {
      firstname, lastname, othername, email, phoneNumber, username, password,
    };

    Joi.validate(validateObject, signupSchema, (err) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: err.details[0].message,
        });
      }
      next();

    });
  }

  /**
  * @static
  * @description Validates a user login
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @param {Object} next - Next function call
  * @memberof Controllers
  */

  static validateLogin(req, res, next) {
    const {
      username, password,
    } = req.body;

    const validateObject = {
      username, password,
    };

    Joi.validate(validateObject, loginSchema, (err) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: err.details[0].message,
        });
      }
      next();
    });
  }

  /**
  * @static
  * @description Validates a comment
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @param {Object} next - Next function call
  * @memberof Controllers
  */

  static validateComment(req, res, next) {
    const { comment,questionid } = req.body;

    const validateObject = {
      comment,
    };

    Joi.validate(validateObject, CommentSchema, (err) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: err.details[0].message,
        });
      }
      if (!Number.isInteger(Number(questionid))) {
        return res.status(400).json({
          status: 400,
          error: 'questionid should be an integer',
        });
      }
      else next();
    });
  }

  /**
  * @static
  * @description Validates a comment
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @param {Object} next - Next function call
  * @memberof Controllers
  */

  static validateTag(req, res, next) {
    const { tags } = req.body;

    const validateObject = {
      tags,
    };

    Joi.validate(validateObject, CommentSchema, (err) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: err.details[0].message,
        });
      }
      next();
    });
  }

  /**
  * @static
  * @description Validates a comment
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @param {Object} next - Next function call
  * @memberof Controllers
  */

  static validateImage(req, res, next) {
    const { images } = req.body;

    const validateObject = {
      images,
    };

    Joi.validate(validateObject, CommentSchema, (err) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: err.details[0].message,
        });
      }
      next();
    });
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
        return res.status(400).json({
          status: 400,
          error: 'title should not be a number',
        });
      } else if (Util.stringIsNumber(location)) {
        return res.status(400).json({
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
      title, body, meetup,
    } = req.body;

    const validateObject = {
      title, body, meetup,
    };

    Joi.validate(validateObject, questionSchema, (err) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: err.details[0].message,
        });
      }
      if (Util.stringIsNumber(title)) {
        return res.status(400).json({
          status: 400,
          error: 'title should not be a number',
        });
      } else if (Util.stringIsNumber(body)) {
        return res.status(400).json({
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
    const { status } = req.body;

    const validateObject = { status };

    Joi.validate(validateObject, rsvpSchema, (err) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: err.details[0].message,
        });
      }
      if (Util.stringIsNumber(status)) {
        return res.status(400).json({
          status: 400,
          error: 'status should not be a number',
        });
      } else next();
    });
  }
}

export default Validate;
