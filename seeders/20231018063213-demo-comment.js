'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */
   await queryInterface.bulkInsert('Comments', [{
     text: 'Resep Ini Sangat Mudah Dimengerti, Saya Langsung Dapat Melakukannya Dengan Baik',
     user_id: 6,
     recipe_id: 4,
     createdAt: new Date(),
     updatedAt: new Date(),
   }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
    */
    await queryInterface.bulkDelete('Comments', null, {truncate: true});
  }
};
