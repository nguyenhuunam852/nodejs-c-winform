'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data=[{
      rolename:"admin"
    }];
    data.map(item=>{
      item.createdAt=Sequelize.literal('NOW()');
      item.updatedAt=Sequelize.literal('NOW()');
      return item
    });

    return queryInterface.bulkInsert('Roles', data,{});
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
