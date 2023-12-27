export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "transactions",
      [
        {
          id: "1",
          userId: "1",
          accountId: "1",
          amount: 20,
          referenceNo: "ueebbe-388373-00dkdm",
          category: "group-deposit",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  down: async (queryInterface, Sequelize) => {},
};
