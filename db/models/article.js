'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.belongsTo(models.Account, {
        foreignKey: 'adminId',
      });
      Article.belongsTo(models.Category, {
        foreignKey: 'categoryId',
      });
    }
  }
  Article.init(
    {
      categoryId: DataTypes.STRING,
      image: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      adminId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Article',
    }
  );
  return Article;
};
