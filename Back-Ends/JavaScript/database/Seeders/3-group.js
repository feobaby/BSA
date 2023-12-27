export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "groups",
      [
        {
          id: "1",
          userId: "1",
          name: "Spartans",
          description: "Fun time with fam.",
          category: "Functions",
          groupBalance: 50,
          goalBalance: 200,
          currency: "USD",
          emails: ["funmi@gmail.com", "ken@gmail.com"],
          status: "In Progress",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  down: async (queryInterface, Sequelize) => {},
};
