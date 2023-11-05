module.exports = {
  articlePage: async (req, res) => {
    try {
      res.render('admin/artikel/view_article', {
        route: 'Article',
      });
    } catch (error) {
      console.log(error);
    }
  },
  AddArticleCategoryPage: async (req, res) => {
    try {
      res.render('admin/artikel/create_category_article', {
        route: 'Article',
      });
    } catch (error) {
      console.log(error);
    }
  },
  addArticlePage: async (req, res) => {
    try {
      res.render('admin/artikel/create_article', {
        route: 'Article',
      });
    } catch (error) {
      console.log(error);
    }
  },
};
