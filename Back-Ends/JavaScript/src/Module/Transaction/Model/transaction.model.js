const newDate = new Date().toISOString();

export default (sequelize, DataTypes) => {
  const Transactions = sequelize.define("transactions", {
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    accountId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: "Accounts",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    referenceNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("wallet-deposit", "group-deposit"),
      allowNull: false,
    },
    createdAt: {
      type: newDate,
      allowNull: false,
    },
    updatedAt: {
      type: newDate,
      allowNull: false,
    },
  });
  return Transactions;
};
