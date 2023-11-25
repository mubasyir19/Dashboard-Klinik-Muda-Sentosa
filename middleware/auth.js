module.exports = {
  isLoginAccount: (req, res, next) => {
    if (req.session.account === null || req.session.account === undefined) {
      res.redirect('/');
    } else {
      next();
    }
  },
  validateRole: (role) => {
    return (req, res, next) => {
      const user = req.session.account;

      if (user && user.role === role) {
        next();
      } else {
        // res.status(403).send('Forbidden');
        res.redirect('/dashboard');
      }
    };
  },
};
