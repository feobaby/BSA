import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

dotenv.config();

export default class Jwt {
  static async generateToken(userId: string) {
    const jwtSecret: any = process.env.SECRET;
    const token = jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
    return token;
  }

  static async verifyToken(token: any, secret: any = process.env.SECRET) {
    const decoded = await jwt.verify(token, secret);
    return decoded;
  }
}
