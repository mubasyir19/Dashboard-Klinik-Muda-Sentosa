'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = bcrypt.hashSync('rahasia', 10);
    await queryInterface.bulkInsert(
      'Accounts',
      [
        {
          id: 'abd6c9b0-ee33-4fc1-b5c8-f71e3cd1cd80',
          name: 'Mahdy',
          username: 'mubasyir19',
          password: password,
          role: 'SuperAdmin',
          status: 'Aktif',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Accounts', null, {});
  },
};
