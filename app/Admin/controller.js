module.exports = {
  viewLogin: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('admin/login/view_login', {
        route: 'Login',
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
          }
        } else {
          req.flash('alertMessage', `${error.message}`);
          req.flash('alertStatus', 'danger');
          res.redirect('/');
        }
      } else {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/');
      }
    } catch (error) {
      console.log(error);
    }
  },
};
