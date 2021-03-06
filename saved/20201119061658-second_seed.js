'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data=[{
      username:"admin",
      password:"admin",
      idrole:1
    }];
    data.map(item=>{
      item.createdAt=Sequelize.literal('NOW()');
      item.updatedAt=Sequelize.literal('NOW()');
      return item
    });
    return queryInterface.bulkInsert('Users', data,{});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
