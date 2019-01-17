import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Authenticate {
  /**
    * @static
    * @description Authenticate an admin
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @param {Object} next - Next function call
    * @returns {object} Json
    * @memberof Controllers
    */
  static isAdmin(req, res, next) {
    const codedToken = req.headers.authorization;
    if (codedToken === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'Bad request',
      });
    }
    const token = codedToken.split(' ')[1];
    const verify = jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 400,
          error: 'Unauthorized user',
        });
      }
      return decoded;
    });
    if (verify.isadmin) {
      next();
    } else {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized user',
      });
    }
  }

  /**
    * @static
    * @description Authenticate an admin
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @param {Object} next - Next function call
    * @returns {object} Json
    * @memberof Controllers
    */
  static authen(req, res, next) {
    const codedToken = req.headers.authorization;
    if (codedToken === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'Bad request',
      });
    }
    const token = codedToken.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_KEY, (err) => {
      if (err) {
        return res.status(401).json({
          status: 400,
          error: 'Unauthorized user',
        });
      }
      next();
    });
  }

  /**
    * @static
    * @description Authenticate an admin
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @param {Object} next - Next function call
    * @returns {object} Json
    * @memberof Controllers
    */
  static isUser(req, res, next) {
    const codedToken = req.headers.authorization;
    if (codedToken === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'Bad request',
      });
    }
    const token = codedToken.split(' ')[1];
    const verify = jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 400,
          error: 'Unauthorized user',
        });
      }
      return decoded;
    });
    if (!verify.isadmin) {
      next();
    } else {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized user found',
      });
    }
  }
}

export default Authenticate;
