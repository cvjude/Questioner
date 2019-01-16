import pool from '../config/config';
import { hash } from '../helper/passwordHash';
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
        return res.status(400).json({
          status: 400,
          error: 'User already exist',
        });
      }

      const registered = new Date().toString();
      const isAdmin = false;
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
        values: [firstname, lastname, othername, email, phoneNumber, username, registered, isAdmin, hashPassword],
      };

      const userArray = await pool.query(userRecord);

      const { id } = userArray.rows[0].id;
      const TokenObj = {
        id, firstname, lastname, isAdmin,
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
        error: err,
      });
    }
  }
}

export default User;
