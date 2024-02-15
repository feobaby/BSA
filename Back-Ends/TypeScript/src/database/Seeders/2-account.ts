import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.bulkInsert(
      'accounts',
      [
        {
          id: '1000',
          userId: '1000',
          balance: 1000,
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
