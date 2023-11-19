module.exports = {
  HomeDashboard: async (req, res) => {
    try {
      res.render('index', {
        user: req.session.account,
        route: 'Dashboard',
      });
    } catch (error) {
      console.log(error);
    }
  },
};
