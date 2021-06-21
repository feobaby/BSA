module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Transactions', [{
      id: 'ba41df1d-074b-4443-901c-350ddcbb692c',
      userId: '98e0350f-ed09-46b0-83d7-8a135afeaf84',
      amount: 200,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4affc9ad-178e-4a33-918e-643a10dd1d9f',
      userId: '98e0350f-ed09-46b0-83d7-8a135afeaf84',
      amount: 500,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
  },
};
