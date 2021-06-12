module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Groups', [{
      id: '44ccf572-44bd-405d-90a6-3c9e6c937ce1',
      userId: '98e0350f-ed09-46b0-83d7-8a135afeaf84',
      emails: ['francis@gmail.com', 'ufuoma@gmail.com'],
      name: 'Onwards',
      category: 'Functions',
      goalBalance: 1000,
      description: 'Let us party',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4bfb6bb8-403e-4f68-a975-46b3e445508a',
      userId: 'fc1f4e85-8e83-4a38-ab1e-8e4da2c6ddbb',
      emails: ['francis@gmail.com', 'ufuoma@gmail.com'],
      name: 'Forward',
      category: 'Movies',
      goalBalance: 2000,
      description: 'Let us watch MechaGodzilla',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
  },
};
