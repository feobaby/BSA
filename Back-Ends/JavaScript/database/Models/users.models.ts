const newDate = new Date().toISOString();

export default (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "Admin"),
      defaultValue: "user",
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
  Users.associate = (models) => {
    Users.hasMany(models.groups, {
      as: "GroupsCreatedByUser",
      foreignKey: "userId",
    });
    Users.hasOne(models.accounts, {
      as: "UserAccount",
      foreignKey: "userId",
    });
    Users.hasMany(models.transactions, {
      as: "UserTransactions",
      foreignKey: "userId",
    });
  };
  return Users;
};