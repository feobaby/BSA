"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  var Group = sequelize.define('Groups', {
    userId: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM('Trips', 'Movies', 'Functions', 'Home Bills'),
      allowNull: false
    },
    groupBalance: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false
    },
    goalBalance: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    emails: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      unique: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Group.associate = function (models) {
    Group.belongsTo(models.Users, {
      as: 'GroupsCreatedByUser',
      foreignKey: 'userId'
    });
  };

  return Group;
};

exports["default"] = _default;
//# sourceMappingURL=2-groups.js.map