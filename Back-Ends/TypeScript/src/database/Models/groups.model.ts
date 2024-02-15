import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/Sequelize/index';
import { GroupModel } from '../../utils/types/database/database.type';

export const Groups = sequelize.define<GroupModel>('groups', {
  userId: {
    type: DataTypes.STRING,
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
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM(
      'Trips',
      'Movies',
      'Functions',
      'Bills',
      'Travel',
      'Other',
      'Dinner',
    ),
    allowNull: false,
  },
  groupBalance: {
    type: DataTypes.STRING,
    defaultValue: 0.0,
    allowNull: false,
  },
  goalBalance: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'USD',
    allowNull: false,
  },
  emails: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    unique: false,
  },
  status: {
    type: DataTypes.ENUM('In Progress', 'Completed'),
    allowNull: false,
  },
});
