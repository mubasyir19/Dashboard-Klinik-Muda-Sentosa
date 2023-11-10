const { Article, Category, Account } = require('../../db/models');

module.exports = {
  getAllAlrticles: async (req, res, next) => {
    try {
      const getData = await Article.findAll({
        include: [
          {
            model: Category,
            attributes: ['id', 'name'],
          },
          {
            model: Account,
            attributes: ['id', 'name', 'role'],
          },
        ],
      });

      res.status(200).json({
        message: 'success get data',
        data: getData,
      });
    } catch (error) {
      next(error);
    }
  },
  getArticleById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const getArticle = await Article.findOne(
        {
          where: {
            id: id,
          },
        },
        {
          include: [
            {
              model: Category,
              attributes: ['id', 'name'],
            },
            {
              model: Account,
              attributes: ['id', 'name', 'role'],
            },
          ],
        }
      );

      res.status(200).json({
        message: 'success get data article',
        data: getArticle,
      });
    } catch (error) {
      next(error);
    }
  },
};
