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
      return res.status(403).json({
        status: 403,
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
      topic, location, tags, happeningOn,
    } = req.body;
    if (topic && location && tags && happeningOn) {
      next();
    } else {
      return res.status(400).json({
        status: 400,
        error: 'No blank fields',
      });
    }
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
    if (title && body && user && meetup) {
      if (Number.isInteger(Number(meetup)) && Number.isInteger(Number(user))) { next(); } else {
        return res.status(403).json({
          status: 403,
          error: 'meetupid or userid must be integer',
        });
      }
    } else {
      return res.status(400).json({
        status: 400,
        error: 'No blank fields',
      });
    }
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
    if (response && user) {
      if (Number.isInteger(Number(user))) { next(); } else {
        return res.status(403).json({
          status: 403,
          error: 'userid must be integer',
        });
      }
    } else {
      return res.status(400).json({
        status: 400,
        error: 'No blank fields',
      });
    }
  }

  /**
  * @static
  * @description Validates an rsvp
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @param {Object} next - Next function call
  * @memberof Controllers
  */

  static validateVote(req, res, next) {
    const { vote } = req.body;
    if (vote) { next(); } else {
      return res.status(400).json({
        status: 400,
        error: 'No blank fields',
      });
    }
  }
}

export default Validate;