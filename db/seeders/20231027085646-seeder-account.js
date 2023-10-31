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
          name: 'John Doe',
          username: 'jd1112',
          password: password,
          role: 'SuperAdmin',
          status: 'Aktif',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '96dd1960-5fcf-49b2-ae32-2e94e309fee5',
          name: 'Dokter 1',
          username: 'dokter1',
          password: password,
          role: 'Dokter',
          status: 'Aktif',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '7b708523-1805-4fb5-99ab-b85310abaf19',
          name: 'Admin 1',
          username: 'admin1',
          password: password,
          role: 'Admin',
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
