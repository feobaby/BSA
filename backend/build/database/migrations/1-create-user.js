"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(function () {
      return queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()')
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        role: {
          type: Sequelize.ENUM('User', 'Admin'),
          allowNull: false,
          defaultValue: 'User'
        },
        balance: {
          type: Sequelize.FLOAT,
          defaultValue: 0,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
    });
  },
  down: function down(queryInterface) {
    return queryInterface.dropTable('Users');
  }
};
exports["default"] = _default;
//# sourceMappingURL=1-create-user.js.map