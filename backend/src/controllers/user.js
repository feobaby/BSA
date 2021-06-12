import models from '../models';
import { generateToken } from '../utils/index';
import Helper from '../utils/bcrypt';

const { Users } = models;
const { hashPassword } = Helper;

/**
 * @class UserController
 * @description Controllers for Users
 * @exports UsersController
 */
export default class UsersController {
  /**
   * @method createUser
   * @description Method for user registration
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} Returns body object
   */
  static async createUser(req, res) {
    try {
      const {
        email,
      } = req.body;
      req.body.password = await hashPassword(req.body.password);
      const user = await Users.findOne({ where: { email } });
      if (user) {
        return res.status(409)
          .json({ status: 409, error: 'This email exists already.' });
      }
      const result = await Users.create(req.body);
      const { id: userId } = result;
      const token = await generateToken({ userId });
      return res.status(201).json({
        status: 201, message: 'Successful!', data: result, token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 500, error: 'Oops, there\'s an error!' });
    }
  }

  /**
   * @method signInUser
   * @description Method for user sign in
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async signInUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ status: 401, error: 'Unauthorised email, sorry.' });
      }
      const isPasswordValid = await Helper.comparePassword(user.password, password);
      if (!isPasswordValid) {
        return res.status(401).json({ status: 401, error: 'Unauthorised password, sorry.' });
      }
      const {
        id: userId,
      } = user;
      const token = await generateToken({ userId });
      return res.status(200).json({
        status: 200,
        userId,
        token,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Oops, there\'s an error!' });
    }
  }

  /**
   * @method getAnAccount
   * @description Method for user to get an account
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} Returns body object
   */
  static async getAnAccount(req, res) {
    const { userId } = req.user;
    try {
      const result = await Users.findOne({ where: { id: userId } });
      if (!result) {
        return res.status(404).json({ status: 404, error: 'Account not found!' });
      }
      return res.status(200).json({ status: '200', message: 'Successful!', data: result });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Oops, there\'s an error!' });
    }
  }

  /**
   * @method updateAnAccount
   * @description Method for user to update an account
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} Returns body object
   */
  static async updateAnAccount(req, res) {
    const { userId } = req.user;
    const {
      firstName, lastName, balance,
    } = req.body;
    try {
      const result = await Users.findOne({ where: { id: userId } });
      if (!result) {
        return res.status(404).json({ status: 404, error: 'Account not found!' });
      }
      await Users.update({
        firstName, lastName, balance,
      }, { where: { id: userId } });
      return res.status(200).json({
        status: 200,
        message: 'Successful!',
        data: {
          firstName, lastName, balance,
        },
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Oops, there\'s an error!' });
    }
  }

  /**
   * @method addMoney
   * @description Method for user to add money
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} Returns body object
   */
  static async addMoney(req, res) {
    const { balance, amount } = req.body;
    const { userId } = req.user;
    const addToBalance = parseFloat(balance + amount);
    try {
      await Users.update({ balance: addToBalance }, { where: { id: userId } });
      return res.status(200).json({
        status: 200,
        message: 'Successful!',
        data: { newbalance: addToBalance },
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Oops, there\'s an error!' });
    }
  }
}
