class validate {

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
        message: 'No blanck fields',
      });
    }
  }
}

export default validate;
