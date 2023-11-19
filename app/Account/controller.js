const { Account } = require('../../db/models');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

module.exports = {
  // Account page
  AccountPage: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const account = await Account.findAll();

      res.render('admin/account/view_account', {
        route: 'Account',
        account,
        alert,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Kesalahan, tidak bisa akses halaman`);
      req.flash('alertStatus', 'danger');
      res.redirect('/dashboard');
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
      req.flash('alertMessage', `Terjadi Kesalahan, tidak bisa akses halaman`);
      req.flash('alertStatus', 'danger');
      res.redirect('/account');
    }
  },
  // Add Account action
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

      req.flash('alertMessage', 'Berhasil tambah akun');
      req.flash('alertStatus', 'success');

      res.redirect('/account');
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi kesalahan, gagal menambah akun`);
      req.flash('alertStatus', 'danger');
      res.redirect('/account');
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      // const { status } = req.query;

      const findAccount = await Account.findOne({
        where: {
          id: id,
        },
      });

      let status = findAccount.status === 'Aktif' ? 'Non-Aktif' : 'Aktif';

      await findAccount.update({ status: status });

      req.flash('alertMessage', 'Berhasil ubah status');
      req.flash('alertStatus', 'success');
      res.redirect('/account');
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi kesalahan, gagal mengubah status`);
      req.flash('alertStatus', 'danger');
      res.redirect('/account');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.body;

      const findAccount = await Account.findOne({
        where: {
          id: id,
        },
      });

      await findAccount.destroy();

      req.flash('alertMessage', 'Berhasil hapus akun');
      req.flash('alertStatus', 'success');

      res.redirect('/account');
    } catch (error) {
      req.flash('alertMessage', `Terjadi kesalahan, gagal menghapus akun`);
      req.flash('alertStatus', 'danger');
      res.redirect('/account');
    }
  },
};
