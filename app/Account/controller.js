const { Account } = require('../../db/models');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

module.exports = {
  // Account page
  AccountPage: async (req, res) => {
    try {
      res.render('admin/account/view_account', {
        route: 'Account',
      });
    } catch (error) {
      console.log(error);
    }
  },
  // Add Account Page
  addAccountPage: async (req, res) => {
    try {
      res.render('admin/account/create_account', {
        route: 'Account',
      });
    } catch (error) {
      console.log(error);
    }
  },
  actionAddAccount: async (req, res) => {
    try {
      const { name, username, role, password } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const accountId = uuid.v4();

      await Account.create({
        id: accountId,
        name,
        username,
        role,
        password: hash,
      });

      // req.flash('alertMessage', 'Berhasil tambah akun');
      // req.flash('alertStatus', 'success');

      res.redirect('/account');
    } catch (error) {
      console.log(error);
      // req.flash('alertMessage', `${error.message}`);
      // req.flash('alertStatus', 'danger');
      res.redirect('/kategori');
    }
  },
};
