"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(function () {
      return queryInterface.createTable('Groups', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()')
        },
        userId: {
          type: Sequelize.DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          },
          unique: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        category: {
          type: Sequelize.ENUM('Trips', 'Movies', 'Functions', 'Home Bills'),
          allowNull: false
        },
        groupBalance: {
          type: Sequelize.FLOAT,
          defaultValue: 0,
          allowNull: false
        },
        goalBalance: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        emails: {
          type: Sequelize.DataTypes.ARRAY(Sequelize.STRING),
          allowNull: false,
          unique: false
        },
        description: {
          type: Sequelize.STRING,
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
    return queryInterface.dropTable('Groups');
  }
};
exports["default"] = _default;
//# sourceMappingURL=2-create-group.js.map