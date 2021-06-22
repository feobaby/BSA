"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  var Transaction = sequelize.define('Transactions', {
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Transaction;
};

exports["default"] = _default;
//# sourceMappingURL=3-transactions.js.map