'use strict';

module.exports = function (app) {
    var controller = require('./controller');

    app.route('/').get(controller.index);
    app.route('/mahasiswa').get(controller.getAllMahasiswa);
    app.route('/mahasiswa/:id').get(controller.getDetailMahasiswa);
    app.route('/mahasiswa').post(controller.addMahasiswa);
    app.route('/mahasiswa/').put(controller.updateMahasiswa);
    app.route('/mahasiswa/').delete(controller.deleteMahasiswa);
}