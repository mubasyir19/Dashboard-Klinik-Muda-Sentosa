const express = require('express');
const router = express.Router();
const admin = require('../app/Admin/controller');
const home = require('../app/Home/controller');
const account = require('../app/Account/controller');
const article = require('../app/Artikel/controller');
const consultation = require('../app/Konsultasi/controller');

// Login
router.get('/', admin.viewLogin);
router.post('/', admin.actionLogin);

//SignUp superadmin
router.post('/signup', admin.actionSignUp);

// Dashboard
router.get('/dashboard', home.HomeDashboard);

// Account
router.get('/account', account.AccountPage);
router.get('/account/add', account.addAccountPage);
router.post('/account/add', account.actionAddAccount);
router.put('/account/status/:id', account.actionStatus);
router.delete('/account/delete', account.actionDelete);

// Article
router.get('/article', article.articlePage);
router.get('/article/add', article.addArticlePage);
router.get('/article/category/add', article.addCategoryPage);
router.post('/article/category/add', article.addCategory);
router.get('/article/category/edit/:id', article.editCategoryPage);
router.put('/article/category/edit/:id', article.editCategory);
router.delete('/article/category/delete', article.deleteCategory);

// Consultations
router.get('/consultation', consultation.ConsultationPage);

module.exports = router;
