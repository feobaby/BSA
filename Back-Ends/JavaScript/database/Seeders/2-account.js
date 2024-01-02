export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "accounts",
      [
        {
          id: "1000",
          userId: "1000",
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
