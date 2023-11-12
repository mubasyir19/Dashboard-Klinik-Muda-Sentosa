const { Article, Category, Account, Consultation } = require('../../db/models');
const uuid = require('uuid');

module.exports = {
  // Article
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
  // Consultation
  addQuestionConsultant: async (req, res, next) => {
    try {
      const { asker, question } = req.body;

      const consultationId = uuid.v4();

      const quest = await Consultation.create({
        id: consultationId,
        asker,
        question,
      });

      res.status(200).json({
        message: 'Berhasil kirim pertanyaan',
        data: quest,
      });
    } catch (error) {
      next(error);
    }
  },
  getAllAnswerConsultation: async (req, res, next) => {
    try {
      const getData = await Consultation.findAll();

      res.status(200).json({
        message: 'Berhasil ambil semua data',
        data: getData,
      });
    } catch (error) {
      next(error);
    }
  },
  getAllAnswerConsultationById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const getData = await Consultation.findOne({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        message: 'Berhasil ambil data',
        data: getData,
      });
    } catch (error) {
      next(error);
    }
  },
};
