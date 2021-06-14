import bcrypt from 'bcryptjs';

const password = '12345';
const hash = bcrypt.hashSync(password, 10);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      id: '98e0350f-ed09-46b0-83d7-8a135afeaf84',
      email: 'francis@gmail.com',
      password: hash,
      firstName: 'Francis',
      lastName: 'Xavier',
      role: 'User',
      balance: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'fc1f4e85-8e83-4a38-ab1e-8e4da2c6ddbb',
      email: 'ufuoma@gmail.com',
      password: hash,
      firstName: 'Ufuoma',
      lastName: 'lewis',
      role: 'User',
      balance: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'fc1f4e85-8e83-4a38-ab1e-8e4da2c6dd25',
      email: 'fiyin@gmail.com',
      password: hash,
      firstName: 'Fiyin',
      lastName: 'Johnson',
      role: 'User',
      balance: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '1fee886c-f0ff-4964-8353-56af78fc6499',
      email: 'dele@gmail.com',
      password: hash,
      firstName: 'Dele',
      lastName: 'Adeleke',
      role: 'User',
      balance: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
  },
};
