'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Consultations',
      [
        {
          id: 'df6aa9c2-d51f-4d2c-be4b-65301dc23245',
          asker: 'Orang Asing',
          question: 'Penyebab muntah-muntah di malam hari',
          dokterId: '96dd1960-5fcf-49b2-ae32-2e94e309fee5',
          answer:
            'Pergi malam hari hanya kaosan, tidak menggunakan jaket, padahal dilihat dari musim sekarang adalah musim pancaroba',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Consultations', null, {});
  },
};
