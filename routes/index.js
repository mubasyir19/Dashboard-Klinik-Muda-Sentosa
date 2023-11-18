const express = require('express');
const router = express.Router();
const admin = require('../app/Admin/controller');
const home = require('../app/Home/controller');
const account = require('../app/Account/controller');
const article = require('../app/Artikel/controller');
const consultation = require('../app/Konsultasi/controller');
const api = require('../app/API/controller');
const { uploadSingle } = require('../middleware/multer');
const { isLoginAccount } = require('../middleware/auth');

// Authentication
router.get('/', admin.viewLogin);
router.post('/', admin.actionLogin);

//SignUp superadmin
router.post('/signup', admin.actionSignUp);

// Dashboard
router.get('/dashboard', isLoginAccount, home.HomeDashboard);

// Account
router.get('/account', isLoginAccount, account.AccountPage);
router.get('/account/add', isLoginAccount, account.addAccountPage);
router.post('/account/add', isLoginAccount, account.actionAddAccount);
router.put('/account/status/:id', isLoginAccount, account.actionStatus);
router.delete('/account/delete', isLoginAccount, account.actionDelete);

// Article
router.get('/article', isLoginAccount, article.articlePage);

// Category Article
router.get('/article/category/add', isLoginAccount, article.addCategoryPage);
router.post('/article/category/add', isLoginAccount, article.addCategory);
router.get('/article/category/edit/:id', isLoginAccount, article.editCategoryPage);
router.put('/article/category/edit/:id', isLoginAccount, article.editCategory);
router.delete('/article/category/delete', isLoginAccount, article.deleteCategory);

// Article Action
router.get('/article/add', isLoginAccount, article.addArticlePage);
router.post('/article/add', isLoginAccount, uploadSingle, article.addArticle);
router.get('/article/detail/:id', isLoginAccount, article.detailArticlePage);
router.put('/article/detail/:id', isLoginAccount, uploadSingle, article.actionEditArticle);
router.delete('/article/delete', isLoginAccount, article.actionDeleteArticle);

// Consultations
router.get('/consultation', isLoginAccount, consultation.ConsultationPage);
router.get('/consultation/detail/:id', isLoginAccount, consultation.detailConsultationPage);
router.put('/consultation/detail/:id', isLoginAccount, consultation.actionUpdateConsultation);

// API
router.get('/api/category', api.getAllCategories);
router.get('/api/category/:id', api.getCategory);
router.get('/api/article', api.getAllAlrticles);
router.get('/api/article/:id', api.getArticleById);
router.post('/api/consultation', api.addQuestionConsultant);
router.get('/api/consultation', api.getAllAnswerConsultation);
router.get('/api/consultation/:id', api.getAllAnswerConsultationById);

module.exports = router;
