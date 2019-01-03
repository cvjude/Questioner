class validate {

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
        return res.status(400).json({
          status: 400,
          message: 'meetupid or userid must be integer',
        });
      }
    } else {
      return res.status(400).json({
        status: 400,
        message: 'No blanck fields',
      });
    }
  }
}

export default validate;
