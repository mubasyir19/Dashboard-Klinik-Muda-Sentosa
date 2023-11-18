module.exports = {
  isLoginSuperAdmin: (req, res, next) => {
    if (req.session.account === null || req.session.account === undefined) {
      res.redirect('/');
    } else {
      next();
    }
  },
};
