export default {
    up(queryInterface, Sequelize) {
      return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(() => queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()')
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: true
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: true
        },
        role: {
          type: Sequelize.ENUM('Media-team member', 'Chorister', 'Reverend', 'Pastor', 'Other'),
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }));
    },
    down: (queryInterface) => queryInterface.dropTable('Users')
  };