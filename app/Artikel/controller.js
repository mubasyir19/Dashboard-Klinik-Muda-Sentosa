const { Article, Category, Account } = require('../../db/models');
const uuid = require('uuid');

module.exports = {
  articlePage: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const getAllCategory = await Category.findAll();
      const getAllArticle = await Article.findAll({
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

      res.render('admin/artikel/view_article', {
        route: 'Article',
        getAllCategory,
        getAllArticle,
        alert,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/article');
    }
  },
  addCategoryPage: async (req, res) => {
    try {
      res.render('admin/artikel/create_category_article', {
        route: 'Article',
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/article');
    }
  },
  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const categoryId = uuid.v4();

      await Category.create({
        id: categoryId,
        name,
      });

      req.flash('alertMessage', 'Berhasil tambah kategori');
      req.flash('alertStatus', 'success');

      res.redirect('/article');
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/article');
    }
  },
  editCategoryPage: async (req, res) => {
    try {
      const { id } = req.params;
      const getCategory = await Category.findOne({
        where: {
          id,
        },
      });

      res.render('admin/artikel/edit_category_article', {
        route: 'Article',
        getCategory,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/article');
    }
  },
  editCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const findCategory = await Category.findOne({
        where: {
          id: id,
        },
      });

      await findCategory.update({ name });

      req.flash('alertMessage', 'Berhasil ubah kategori');
      req.flash('alertStatus', 'success');

      res.redirect('/article');
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/article');
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.body;
      const getCategory = await Category.findOne({
        where: {
          id,
        },
      });

      await getCategory.destroy();

      req.flash('alertMessage', 'Berhasil hapus kategori');
      req.flash('alertStatus', 'success');

      res.redirect('/article');
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/article');
    }
  },
  addArticlePage: async (req, res) => {
    try {
      const getCategory = await Category.findAll();

      res.render('admin/artikel/create_article', {
        route: 'Article',
        getCategory,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/article');
    }
  },
};
