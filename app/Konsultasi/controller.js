const { Consultation, Account } = require('../../db/models');

module.exports = {
  ConsultationPage: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const getConsultationData = await Consultation.findAll({
        include: [
          {
            model: Account,
            attributes: ['id', 'name', 'role'],
          },
        ],
      });

      res.render('admin/konsultasi/view_consultation', {
        route: 'Consultation',
        alert,
        getConsultationData,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/consultation');
    }
  },
};
