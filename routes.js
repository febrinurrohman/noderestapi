'use strict';

module.exports = function (app) {
    var mahasiswa = require('./mahasiswa');

    app.route('/').get(mahasiswa.index);
    app.route('/mahasiswa').get(mahasiswa.getAllMahasiswa);
    app.route('/mahasiswa/:id').get(mahasiswa.getDetailMahasiswa);
    app.route('/mahasiswa').post(mahasiswa.addMahasiswa);
    app.route('/mahasiswa/').put(mahasiswa.updateMahasiswa);
    app.route('/mahasiswa/').delete(mahasiswa.deleteMahasiswa);
    app.route('/mahasiswa_matakuliah').get(mahasiswa.getMahasiswaMatakuliah);
}