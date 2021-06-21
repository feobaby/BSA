export default (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transactions', {
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Transaction;
};
