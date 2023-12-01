const { Consultation, account } = require('../../db/models');

module.exports = {
  ConsultationPage: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const getConsultationData = await Consultation.findAll({
        include: [
          {
            model: account,
            attributes: ['id', 'name', 'role'],
          },
        ],
      });

      res.render('admin/konsultasi/view_consultation', {
        route: 'Consultation',
        user: req.session.account,
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
  detailConsultationPage: async (req, res) => {
    try {
      const { id } = req.params;

      console.log(req.session.account);

      const getConsultationData = await Consultation.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: account,
            attributes: ['id', 'name', 'role'],
          },
        ],
      });

      res.render('admin/konsultasi/detail_consultation', {
        route: 'Consultation',
        user: req.session.account,
        getConsultationData,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/consultation');
    }
  },
  actionUpdateConsultation: async (req, res) => {
    try {
      const { id } = req.params;
      const { asker, question, answer } = req.body;

      const getConsultationData = await Consultation.findOne({
        where: {
          id: id,
        },
      });

      const doctorId = req.session.account.id;

      if (!getConsultationData) {
        req.flash('alertMessage', `Data tidak ditemukan`);
        req.flash('alertStatus', 'danger');
        res.redirect('/consultation');
      }

      await getConsultationData.update({ asker, question, answer, dokterId: doctorId });

      req.flash('alertMessage', 'Berhasil update konsultasi');
      req.flash('alertStatus', 'success');

      res.redirect('/consultation');
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/consultation');
    }
  },
};
