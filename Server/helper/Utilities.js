import jwt from 'jsonwebtoken';

class Util {
  /**
  * @Static
  * @vaildates the input field to check if the field is a number
  * @memberof questionerController
  */
  static stringIsNumber(str) {
    if (Number.isInteger(Number(str))) { return true; }
    return false;
  }

  /**
  * @Static
  * @vconvertes the token back to json
  * @memberof questionerController
  */
  static decoder(req, res) {
    const codedToken = req.headers.authorization;
    const token = codedToken.split(' ')[1];
    return jwt.decode(token);
  }
}

export default Util;
