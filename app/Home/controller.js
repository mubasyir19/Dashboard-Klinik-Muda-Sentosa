const { account, article, category, Consultation } = require('../../db/models');

module.exports = {
  HomeDashboard: async (req, res) => {
    const dataAccount = await account.count();
    const dataArticle = await article.count();
    const dataCategory = await category.count();
    const consultation = await Consultation.count({ where: { answer: null } });

    try {
      res.render('index', {
        user: req.session.account,
        route: 'Dashboard',
        count: {
          dataAccount,
          dataArticle,
          dataCategory,
          consultation,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
