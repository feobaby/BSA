import models from '../models';

const { Op } = require('sequelize');

const { Groups, Users } = models;

/**
 * @class GroupsController
 * @description Controllers for Groups
 * @exports GroupsController
 */
export default class GroupsController {
  /**
   * @method createGroup
   * @description Method for user create account
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} Returns body object
   */
  static async createGroup(req, res) {
    const {
      name, category, emails, description, goalBalance,
    } = req.body;
    const { userId } = req.user;
    try {
      const result = await Groups.create({
        userId, name, category, emails, description, goalBalance,
      });
      return res.status(201).json({
        status: 201,
        message: 'Successful!',
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 500, error: 'Oops, there\'s an error!' });
    }
  }

  /**
   * @method getAllGroups
   * @description Method for user create groups
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} Returns body object
   */
  static async getAllGroups(req, res) {
    try {
      const data = await Groups.findAndCountAll({
        where: { userId: req.user.userId },
        order: [
          ['createdAt', 'DESC'],
        ],
      });
      if (data.length === 0) {
        return res.status(404).json({ status: 404, error: 'It seems like no groups have been created.' });
      }
      return res.status(200).json({ status: 200, message: 'Successful!', data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 500, error: 'Oops, there\'s an error!' });
    }
  }

  /**
   * @method getAGroup
   * @description Method for user create a group
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} Returns body object
   */
  static async getAGroup(req, res) {
    const { id } = req.params;
    try {
      const result = await Groups.findByPk(id);
      if (!result) {
        return res.status(404).json({ status: 404, error: 'Group not found!' });
      }
      return res.status(200).json({ status: 200, message: 'Successful!', data: result });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Oops, there\'s an error!' });
    }
  }

  /**
   * @method getAGroupYouArePartOf
   * @description Method for user get a part of group
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} Returns body object
   */
  static async getAGroupYouArePartOf(req, res) {
    const {
      email,
    } = req.query;
    try {
      const result = await Groups.findAndCountAll({
        where: {
          emails: { [Op.contains]: [email] },
        },
      });
      if (!result) {
        return res.status(404).json({
          status: '404',
          message: 'It seems you are not part of any group!',
        });
      }
      return res.status(200).json({ status: 200, message: 'Successful!', data: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 500, error: 'Oops, there\'s an error!' });
    }
  }

  /**
   * @method updateAGroup
   * @description Method for user update a group
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} Returns body object
   */
  static async updateAGroup(req, res) {
    const { id } = req.params;
    const { userId } = req.user;
    const {
      name, category, emails,
    } = req.body;
    try {
      const result = await Groups.findByPk(id);
      if (!result) {
        return res.status(404).json({ status: 404, error: 'Group not found!' });
      }
      if (result.userId !== userId) {
        return res.status(401).json({ status: 401, error: 'Access denied' });
      }
      await Groups.update({
        name, category, emails,
      }, { where: { id } });
      return res.status(200).json({
        status: '200',
        message: 'Successful!',
        data: {
          name, category, emails,
        },
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Oops, there\'s an error!' });
    }
  }

  /**
   * @method depositMoneyToGroup
   * @description Method for user to deposit money to a group
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} Returns body object
   */
  static async depositMoneyToGroup(req, res) {
    try {
      const {
        goalBalance, groupBalance, amount, balance,
      } = req.body;
      const { id } = req.params;
      const { userId } = req.user;
      const addToBalance = parseFloat(groupBalance + amount);
      const checkRemainingBalance = parseFloat(goalBalance - groupBalance);
      const newBalance = parseFloat(balance - amount);

      // if the amount you want to depost exceeds your perosnal balance
      if (amount > balance) {
        return res.status(400).json({ status: 400, error: 'Lol, you do not have enough money now.' });
      }
      // if the amount you want to add exceeds the amount goals
      if (amount > goalBalance) {
        return res.status(400).json({ status: 400, error: 'The amount you wish to add exceeds the group set amount.' });
      }
      // if a user is still trying to add money after the the amount goals is already met
      if (goalBalance === groupBalance) {
        return res.status(400).json({ status: 400, error: 'Nah! You can not add any more money.' });
      }
      // if an amount that is trying to be added exceeds remaining amount that should be added
      if (amount > checkRemainingBalance) {
        return res.status(400).json({ status: 400, error: 'Hey, stop trying to add more money than you should.' });
      }
      await Groups.update({ groupBalance: addToBalance }, { where: { id } });
      const updatePB = await Users.update({ balance: newBalance }, { where: { id: userId } });
      return res.status(200).json({ status: 200, message: 'Successful!', data: { newbalance: addToBalance, updatePB } });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 500, error: 'Oops, there\'s an error!' });
    }
  }

  /**
   * @method deleteAGroup
   * @description Method for user delete a group
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} Returns body object
   */
  static async deleteAGroup(req, res) {
    const { id } = req.params;
    const { userId } = req.user;
    try {
      const result = await Groups.findOne({ where: { id, userId } });
      if (!result) {
        return res.status(404).json({ status: 404, error: 'Group not found!' });
      }
      await Groups.destroy({ where: { id, userId } });
      return res.status(200).json({ status: 200, message: 'Successful!' });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Oops, there\'s an error!' });
    }
  }
}
