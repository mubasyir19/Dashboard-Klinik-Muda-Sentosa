const { account, Article, Category, Consultation } = require('../../db/models');

module.exports = {
  HomeDashboard: async (req, res) => {
    const dataAccount = await account.count();
    const article = await Article.count();
    const category = await Category.count();
    const consultation = await Consultation.count({ where: { answer: null } });

    try {
      res.render('index', {
        user: req.session.account,
        route: 'Dashboard',
        count: {
          dataAccount,
          article,
          category,
          consultation,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
