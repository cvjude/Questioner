/* eslint-disable linebreak-style */
import pool from '../config/config';
import { hash, checkPassword } from '../helper/passwordHash';
import token from '../helper/token';

class User {
  /**
     * @static
     * @description Allow an admin to create a store attendant
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @returns {object} Json
     * @memberof Controllers
     */
  static async signup(req, res) {
    try {
      const data = await pool.query('SELECT * FROM users WHERE username = $1', [
        req.body.username,
      ]);
      if (data.rowCount > 0) {
        return res.status(409).json({
          status: 409,
          error: 'User already exist',
        });
      }

      const registered = new Date().toString();
      const isadmin = false;
      const {
        firstname,
        lastname,
        othername,
        email,
        phoneNumber,
        username,
        password,
      } = req.body;
      const hashPassword = hash(password);

      const userRecord = {
        text: `INSERT INTO users(  
        firstname,
        lastname,
        othername,
        email,
        phoneNumber,
        username,
        registerd,
        isadmin,
        password)VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        values: [firstname, lastname, othername, email, phoneNumber, username, registered, isadmin, hashPassword],
      };

      const userArray = await pool.query(userRecord);

      const { id } = userArray.rows[0];
      const TokenObj = {
        id, firstname, lastname, isadmin,
      };

      return res.status(201).json({
        status: 201,
        data: [{
          token: token(TokenObj),
          data: userArray.rows[0],
        }],
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'Server error',
      });
    }
  }

  /**
 * @static
 * @description Allow a user to login
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns {object} Json
 * @memberof Controllers
 */
  static async login(req, res) {
    try {
      const data = await pool.query('SELECT * FROM users WHERE username = $1', [
        req.body.username,
      ]);

      const loginDetails = data.rows[0];
      if (data.rowCount >= 1) {
        const { password } = req.body;
        const hashPassword = loginDetails.password;

        if (checkPassword(password.trim(), hashPassword)) {
          const {
            id, firstname, lastname, isadmin,
          } = loginDetails;

          const tokenObj = {
            id, firstname, lastname, isadmin,
          };

          return res.status(200).json({
            status: 200,
            data: [{
              token: token(tokenObj),
              data: [loginDetails],
            }],
          });
        }
        return res.status(400).json({
          status: 400,
          error: 'Password is not correct',
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'User not Found',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Server error',
      });
    }
  }
}

export default User;
