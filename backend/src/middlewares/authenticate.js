import { verifyToken } from '../utils';

/**
 * @class Authenticate
 * @description authenticate tokens and roles
 * @exports Authenticate
 */
export default class Authenticate {
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
      return res.status(500).json({ status: '500', error: 'Server error.' });
    }
  }
}
