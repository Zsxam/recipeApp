'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Recipes', [{
      title: 'Ramen',
      thumbnail:"mie-thumb.jpg",
      banner: "mie-banner.jpg",
      description: "Resep ramen kuah pedas yang satu ini bisa jadi inspirasi resep seru saat udara dingin menghampiri. Apalagi kalau kamu pencinta yang serba pedas, pastinya tidak boleh dong ketinggalan resep yang satu ini.",
      video: "mie-vid.jpg",
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    /**
     * Add seed commands here.
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
    */
    await queryInterface.bulkDelete('Recipes', null, {truncate: true});
  }
};
