import { verifyToken } from '../utils';
import models from '../models';

// const { Profiles, Users, Sequelize } = models;

/**
 * @class Authenticate
 * @description authenticate tokens and roles
 * @exports Authenticate
 */
class Authenticate {
  /**
   * @param  {object} req - The user request object
   * @param  {object} res - The user res response object
   * @param  {function} next - The next() Function
   * @returns {String} req.userId - The user id
   */
  static async verifyToken(req, res, next) {
    try {
      const { headers: { authorization } } = req;
      const token = authorization.split(' ')[1];
      if (!token || token === '') {
        return res.status(401).json({ status: '401', error: 'Access denied.' });
      }
      const decoded = await verifyToken(token);
      if (!(decoded && decoded.userId)) {
        return res.status(401).json({ status: '401', error: 'Access denied. We could not verify user.' });
      }
      req.user = decoded;
      return next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: '500', error: 'Server error.' });
    }
  }

  //   /**
  //    * @param  {object} req - The user request object
  //    * @param  {object} res - The user res response object
  //    * @param  {function} next - The next() Function
  //    * @returns {String} req.userId - The user id
  //    */
  //   static async verifySuperOrAdmin(req, res, next) {
  //     const { userId: id } = req.user;
  //     try {
  //       const verify = await Users.findOne({
  //         where: {
  //           id, status: { [Sequelize.Op.or]: ['Super admin', 'Admin'] },
  //         },
  //       });
  //       if (!verify) {
  //         return res.status(401).json({ status: '401', message: 'Access Denied.' });
  //       }
  //       return next();
  //     } catch (error) {
  //       return res.status(500).json({ status: '500', error: 'Server error.' });
  //     }
  //   }

//   /**
//    * @param  {object} req - The user request object
//    * @param  {object} res - The user res response object
//    * @param  {function} next - The next() Function
//    * @returns {String} req.userId - The user id
//    */
//   static async verifyProfile(req, res, next) {
//     try {
//       const profile = await Profiles.findOne({
//         where: { userId: req.params.userId },
//       });
//       if (!profile) {
// eslint-disable-next-line max-len
//         return res.status(404).json({ status: '404', message: 'You haven\'t created a profile yet.' });
//       }
//       return next();
//     } catch (error) {
//       return res.status(500).json({ status: '500', error: 'Server error.' });
//     }
//   }
}

export default Authenticate;
