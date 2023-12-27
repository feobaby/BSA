const newDate = new Date().toISOString();

export default (sequelize, DataTypes) => {
  const Accounts = sequelize.define("accounts", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      unique: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    balance: {
      type: DataTypes.STRING,
      defaultValue: "0.00",
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
  return Accounts;
};
