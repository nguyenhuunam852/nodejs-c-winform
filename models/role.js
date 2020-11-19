'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
       Role.hasMany(models.User,{foreignKey:'idrole'})
    }
  };
  Role.init({
    rolename: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};