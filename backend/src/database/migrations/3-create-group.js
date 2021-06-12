export default {
  up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(() => queryInterface.createTable('Groups', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        unique: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.ENUM('Trips', 'Home', 'Movies', 'Other Outings', 'Functions'),
        allowNull: false,
      },
      groupBalance: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      goalBalance: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      emails: {
        type: Sequelize.DataTypes.ARRAY(Sequelize.STRING),
        allowNull: false,
        unique: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }));
  },
  down: (queryInterface) => queryInterface.dropTable('Accounts'),
};
