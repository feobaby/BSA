import bcrypt from "bcryptjs";

const password = "12345";
const hash = bcrypt.hashSync(password, 10);

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: "1",
          email: "funmi@gmail.com",
          password: hash,
          firstName: "Francis",
          lastName: "Xavier",
          role: "User",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  down: async (queryInterface, Sequelize) => {},
};
