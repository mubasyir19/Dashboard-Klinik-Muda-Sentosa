const { Account } = require('../../db/models');
const bcrypt = require('bcryptjs');

module.exports = {
  viewLogin: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('admin/login/view_login', {
        route: 'Login',
        alert,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/');
    }
  },
  // Action Login
  actionLogin: async (req, res) => {
    try {
      const { username, password } = req.body;

      const checkUser = await Account.findOne({
        where: {
          username: username,
        },
      });

      if (checkUser) {
        if (checkUser.status === 'Aktif') {
          const checkPass = await bcrypt.compare(password, checkUser.password);

          if (checkPass) {
            req.session.account = {
              id: checkUser.id,
              name: checkUser.name,
              username: checkUser.username,
              role: checkUser.role,
              status: checkUser.status,
            };

            // Response Success Login
            res.redirect('/dashboard');
          } else {
            req.flash('alertMessage', `Password Anda Salah`);
            req.flash('alertStatus', 'danger');
            res.redirect('/');
          }
        } else {
          req.flash('alertMessage', `Akun Anda non-aktif`);
          req.flash('alertStatus', 'danger');
          res.redirect('/');
        }
      } else {
        req.flash('alertMessage', `Username Anda belum terdaftar`);
        req.flash('alertStatus', 'danger');
        res.redirect('/');
      }
    } catch (error) {
      // Resopnse Error
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/');
    }
  },
  // SignUp
  actionSignUp: async (req, res) => {
    try {
      const { name, username, role, password } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const result = await Account.create({
        name,
        username,
        role,
        password: hash,
      });

      res.status(201).json({
        message: 'Success SignUp',
        result: result,
      });
    } catch (error) {
      console.log(error);
    }
  },
  // Action Logout
  actionLogout: (req, res) => {
    req.session.destroy();
    res.redirect('/');
  },
};
