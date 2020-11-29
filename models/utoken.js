'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class uToken extends Model {
    static associate(models) {
      uToken.belongsTo(models.User,{foreignKey:'iduser'})
    }
  };
  uToken.init({
    token: DataTypes.STRING,
    active_time: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'uToken',
  });
  return uToken;
};