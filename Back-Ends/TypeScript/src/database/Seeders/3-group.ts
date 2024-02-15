import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.bulkInsert(
      'groups',
      [
        {
          id: '1000',
          userId: '1000',
          name: 'Spartans',
          description: 'Fun time with fam.',
          category: 'Functions',
          groupBalance: 50,
          goalBalance: 200,
          currency: 'USD',
          emails: ['funmi@gmail.com', 'ken@gmail.com'],
          status: 'In Progress',
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
