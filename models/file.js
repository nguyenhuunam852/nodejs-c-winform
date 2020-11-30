'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    static associate(models) {
      File.belongsTo(models.User,{foreignKey:'iduser'})
      File.hasMany(models.UserFileView,{foreignKey:'idfile'})
    }
  };
  File.init({
    filename: DataTypes.STRING,
    key: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};