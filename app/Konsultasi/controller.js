module.exports = {
  ConsultationPage: async (req, res) => {
    try {
      res.render('admin/konsultasi/view_consultation', {
        route: 'Consultation',
      });
    } catch (error) {
      console.log(error);
    }
  },
};
