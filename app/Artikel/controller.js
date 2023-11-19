const { Article, Category, Account } = require('../../db/models');
const uuid = require('uuid');
const fs = require('fs');

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
        user: req.session.account,
        alert,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Kesalahan, tidak bisa akses halaman`);
      req.flash('alertStatus', 'danger');
      res.redirect('/dashboard');
    }
  },
  addCategoryPage: async (req, res) => {
    try {
      res.render('admin/artikel/create_category_article', {
        route: 'Article',
        user: req.session.account,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Kesalahan, tidak bisa akses halaman`);
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
      req.flash('alertMessage', `Terjadi Kesalahan, gagal menambah kategori`);
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
        user: req.session.account,
        getCategory,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Kesalahan, tidak bisa akses halaman`);
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
      req.flash('alertMessage', `Terjadi Kesalahan, gagal ubah kategori`);
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
      req.flash('alertMessage', `Terjadi Kesalahan, gagal hapus kategori`);
      req.flash('alertStatus', 'danger');
      res.redirect('/article');
    }
  },
  addArticlePage: async (req, res) => {
    try {
      const getCategory = await Category.findAll();

      res.render('admin/artikel/create_article', {
        route: 'Article',
        user: req.session.account,
        getCategory,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Kesalahan, tidak bisa akses halaman`);
      req.flash('alertStatus', 'danger');
      res.redirect('/article');
    }
  },
  addArticle: async (req, res) => {
    console.log('Files: ', req.file);
    try {
      const { categoryId, title, content } = req.body;
      const articleId = uuid.v4();

      await Article.create({
        id: articleId,
        categoryId,
        title,
        content,
        image: `uploads/${req.file.filename}`,
      });

      req.flash('alertMessage', 'Berhasil tambah artikel');
      req.flash('alertStatus', 'success');

      res.redirect('/article');
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Kesalahan, gagal tambah artikel`);
      req.flash('alertStatus', 'danger');
      res.redirect('/article');
    }
  },
  detailArticlePage: async (req, res) => {
    try {
      const { id } = req.params;

      const getCategory = await Category.findAll();
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

      res.render('admin/artikel/edit_article', {
        route: 'Article',
        user: req.session.account,
        getArticle,
        getCategory,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Kesalahan, tidak bisa akses halaman`);
      req.flash('alertStatus', 'danger');
      res.redirect('/article');
    }
  },
  actionEditArticle: async (req, res) => {
    try {
      const { id } = req.params;
      const { categoryId, title, content } = req.body;

      const getArticle = await Article.findOne({
        where: {
          id: id,
        },
      });

      if (req.file) {
        await getArticle.update({
          categoryId,
          title,
          content,
          image: `uploads/${req.file.filename}`,
        });
      } else {
        await getArticle.update({
          categoryId,
          title,
          content,
        });
      }

      req.flash('alertMessage', 'Berhasil update artikel');
      req.flash('alertStatus', 'success');

      res.redirect('/article');
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Kesalahan, gagal ubah artikel`);
      req.flash('alertStatus', 'danger');
      res.redirect('/article');
    }
  },
  actionDeleteArticle: async (req, res) => {
    try {
      const { id } = req.body;

      const getArticle = await Article.findOne({
        where: {
          id: id,
        },
      });

      if (!getArticle) {
        req.flash('alertMessage', 'Artikel tidak ditemukan');
        req.flash('alertStatus', 'danger');
        return res.redirect('/article');
      }

      if (getArticle.image) {
        fs.unlinkSync(`public/${getArticle.image}`);
      }

      await getArticle.destroy();

      req.flash('alertMessage', 'Berhasil hapus artikel');
      req.flash('alertStatus', 'success');

      res.redirect('/article');
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Kesalahan, gagal hapus artikel`);
      req.flash('alertStatus', 'danger');
      res.redirect('/article');
    }
  },
};
