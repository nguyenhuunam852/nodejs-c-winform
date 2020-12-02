'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserFileView extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserFileView.belongsTo(models.User,{foreignKey:'iduser'})
      UserFileView.belongsTo(models.File,{foreignKey:'idfile'})
    }
  };
  UserFileView.init({
  }, {
    sequelize,
    modelName: 'UserFileView',
  });
  return UserFileView;
};