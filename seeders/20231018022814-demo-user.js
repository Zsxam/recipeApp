'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */
   await queryInterface.bulkInsert('Users', [{
     name: 'Azka',
     email: 'gb11102005@gmail.com',
     phone: 83130460844,
     password: "zsxam123",
     createdAt: new Date(),
     updatedAt: new Date(),
   }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('Users', null, {truncate: true});
  }
};
