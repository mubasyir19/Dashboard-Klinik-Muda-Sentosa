'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Articles',
      [
        {
          id: 'a9d621ae-2ef0-49bc-9c89-e81e4efcc109',
          categoryId: '425fe77a-d835-4307-a6f5-5373580b56d6',
          image: '/images/gcu1.jpg',
          title: 'Penyelenggaraan Cek Kesehetan Agustusan',
          content:
            'Telah berlangsung kegiatan agustusan yang bertempat di Yayayasan Karya Muda Sentosa pada tanggal 27 Agustus 2023, tidak hanya cek kesehatan saja, disini terdapat bazar yang memamerkan produk asli warga yang dijamin kehalalannya',
          adminId: '7b708523-1805-4fb5-99ab-b85310abaf19',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Articles', null, {});
  },
};
