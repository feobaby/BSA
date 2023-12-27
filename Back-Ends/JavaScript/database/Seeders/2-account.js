export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "accounts",
      [
        {
          id: "1",
          userId: "1",
          balance: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  down: async (queryInterface, Sequelize) => {},
};
