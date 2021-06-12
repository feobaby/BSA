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
    },
    {
      id: '17646675-5332-4b53-9c1d-2540defd21bd',
      email: 'tunde@gmail.com',
      password: hash,
      firstName: 'Tunde',
      lastName: 'Falana',
      role: 'User',
      balance: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'f3922f3f-3fc9-48d9-af4e-de4897554c14',
      email: 'feyi@gmail.com',
      password: hash,
      firstName: 'Feyi',
      lastName: 'Makinde',
      role: 'User',
      balance: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
  },
};
