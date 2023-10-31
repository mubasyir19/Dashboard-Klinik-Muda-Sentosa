const { Account } = require('../../db/models');
const bcrypt = require('bcryptjs');

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
};
