'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role,{foreignKey:'idrole'})
      User.hasOne(models.uToken,{foreignKey:'iduser'})
      User.hasMany(models.File,{foreignKey:'iduser'})
      User.hasMany(models.UserFileView,{foreignKey:'iduser'})
  
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};