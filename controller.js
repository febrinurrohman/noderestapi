'use strict';

var response = require('./response');
var conn = require('./conn');

const selectQuery = function (res, sql) {
    conn.query(sql, function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(200, rows, res);
        }
    });
};

const insertQuery = function (res, sql) {
    conn.query(sql, function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(201, "Created", res);
        }
    });
};

const updateOrDeleteQuery = function (res, sql, action) {
    conn.query(sql, function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            let msg;
            
            if (action === 'update') {
                msg = 'Updated';
            } else if (action === 'delete') {
                msg = 'Deleted';
            }

            response.ok(204, msg, res);
        }
    });
};

exports.index = function (req, res) {
    response.ok(200, "REST API is running", res);
};

exports.getAllMahasiswa = function (req, res) {
    const sql = "SELECT * FROM mahasiswa";

    selectQuery(res, sql);
};

exports.getDetailMahasiswa = function (req, res) {
    const id = req.params.id;
    const sql = `SELECT * FROM mahasiswa WHERE id='${id}'`;

    selectQuery(res, sql);
};

exports.addMahasiswa = function (req, res) {
    const nim = req.body.nim;
    const nama = req.body.nama;
    const jurusan = req.body.jurusan;
    const sql = `INSERT INTO mahasiswa SET nim='${nim}', nama='${nama}', jurusan='${jurusan}'`;

    insertQuery(res, sql);
};

exports.updateMahasiswa = function (req, res) {
    const id = req.body.id;
    const nim = req.body.nim;
    const nama = req.body.nama;
    const jurusan = req.body.jurusan;
    const sql = `UPDATE mahasiswa SET nim='${nim}', nama='${nama}', jurusan='${jurusan}' WHERE id='${id}'`;

    updateOrDeleteQuery(res, sql, 'update');
};

exports.deleteMahasiswa = function (req, res) {
    const id = req.body.id;
    const sql = `DELETE FROM mahasiswa WHERE id='${id}'`;

    updateOrDeleteQuery(res, sql, 'delete');
};