import bcrypt from "bcryptjs";

const password = "12345";
const hash = bcrypt.hashSync(password, 10);

export default {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: "1000",
          email: "funmi@gmail.com",
          password: hash,
          firstName: "Funmi",
          lastName: "Baby",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  down: async (queryInterface: any, Sequelize: any) => {},
};
