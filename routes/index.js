const express = require('express');
const router = express.Router();
const admin = require('../app/Admin/controller');
const home = require('../app/Home/controller');
const account = require('../app/Account/controller');
const article = require('../app/Artikel/controller');
const consultation = require('../app/Konsultasi/controller');
const { uploadSingle } = require('../middleware/multer');
const { isLoginAccount, validateRole } = require('../middleware/auth');

// Authentication
router.get('/', admin.viewLogin);
router.post('/', admin.actionLogin);
router.get('/logout', admin.actionLogout);

//SignUp superadmin
router.post('/signup', admin.actionSignUp);

// Dashboard
router.get('/dashboard', isLoginAccount, home.HomeDashboard);

// Account
router.get('/account', isLoginAccount, validateRole('SuperAdmin'), account.AccountPage);
router.get('/account/add', isLoginAccount, validateRole('SuperAdmin'), account.addAccountPage);
router.post('/account/add', isLoginAccount, validateRole('SuperAdmin'), account.actionAddAccount);
router.put('/account/status/:id', isLoginAccount, validateRole('SuperAdmin'), account.actionStatus);
router.delete('/account/delete', isLoginAccount, validateRole('SuperAdmin'), account.actionDelete);

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

module.exports = router;
