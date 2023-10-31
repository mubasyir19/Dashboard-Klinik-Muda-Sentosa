module.exports = {
  HomeDashboard: async (req, res) => {
    try {
      res.render('index', {
        route: 'Dashboard',
      });
    } catch (error) {
      console.log(error);
    }
  },
};
