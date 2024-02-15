import bcrypt from 'bcryptjs';
import { QueryInterface, DataTypes } from 'sequelize';

const password = '12345';
const hash = bcrypt.hashSync(password, 10);

export default {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: '1000',
          email: 'funmi@gmail.com',
          password: hash,
          firstName: 'Funmi',
          lastName: 'Baby',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  down: async (
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes,
  ) => {},
};
