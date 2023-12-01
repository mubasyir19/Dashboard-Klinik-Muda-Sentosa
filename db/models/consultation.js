'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consultation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Consultation.belongsTo(models.account, {
        foreignKey: 'dokterId',
      });
    }
  }
  Consultation.init(
    {
      asker: DataTypes.STRING,
      question: DataTypes.STRING,
      dokterId: DataTypes.STRING,
      answer: DataTypes.TEXT('long'),
    },
    {
      sequelize,
      modelName: 'Consultation',
    }
  );
  return Consultation;
};
