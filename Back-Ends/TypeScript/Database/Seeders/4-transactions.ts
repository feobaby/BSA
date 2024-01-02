export default {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.bulkInsert(
      "transactions",
      [
        {
          id: "1000",
          userId: "1000",
          accountId: "1000",
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
  down: async (queryInterface: any, Sequelize: any) => {},
};
