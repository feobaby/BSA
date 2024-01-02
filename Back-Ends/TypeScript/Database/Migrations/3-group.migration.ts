export default {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.createTable("groups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        unique: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.ENUM(
          "Trips",
          "Movies",
          "Functions",
          "Bills",
          "Travel",
          "Other",
          "Dinner",
        ),
        allowNull: false,
      },
      groupBalance: {
        type: Sequelize.STRING,
        defaultValue: 0,
        allowNull: false,
      },
      goalBalance: {
        type: Sequelize.STRING,
        defaultValue: 0,
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING,
        defaultValue: "USD",
        allowNull: false,
      },
      emails: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        unique: false,
      },
      status: {
        type: Sequelize.ENUM("In Progress", "Completed"),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.dropTable("groups");
  },
};
