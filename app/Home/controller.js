const { account, article, category, consultation } = require('../../db/models');

module.exports = {
  HomeDashboard: async (req, res) => {
    const dataAccount = await account.count();
    const dataArticle = await article.count();
    const dataCategory = await category.count();
    const dataConsultation = await consultation.count({ where: { answer: null } });

    try {
      res.render('index', {
        user: req.session.account,
        route: 'Dashboard',
        count: {
          dataAccount,
          dataArticle,
          dataCategory,
          dataConsultation,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
