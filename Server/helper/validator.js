class validate {
  /**
  * @static
  * @description Validates if the id is an integer
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @param {Object} next - Next function call
  * @memberof Controllers
  */

  static AnInteger(req, res, next) {
    if (Number.isInteger(Number(req.params.id))) {
      next();
    } else {
      return res.status(400).json({
        status: 400,
        message: 'Id must be an integer',
      });
    }
  }
}

export default validate;
