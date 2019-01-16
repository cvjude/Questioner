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
}

export default Util;
