'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Consultations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      asker: {
        type: Sequelize.STRING,
      },
      question: {
        type: Sequelize.STRING,
      },
      dokterId: {
        type: Sequelize.STRING,
      },
      answer: {
        type: Sequelize.TEXT('long'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Consultations');
  },
};
