'use strict';

var conn = require('./conn');

const response = function (status, values, res) {
    var data = {
        'status': status,
        'values': values
    };

    res.json(data);
    res.end();
};

const selectQuery = function (res, sql) {
    conn.query(sql, function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response(200, rows, res);
        }
    });
};

const insertQuery = function (res, sql) {
    conn.query(sql, function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response(201, "Created", res);
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

            response(204, msg, res);
        }
    });
};

exports.index = function (req, res) {
    response(200, "REST API is running", res);
};

exports.getAllMahasiswa = function (req, res) {
    const sql = "SELECT * FROM mahasiswa";

    selectQuery(res, sql);
};

exports.getDetailMahasiswa = function (req, res) {
    const id = req.params.id;
    const sql = `SELECT * FROM mahasiswa WHERE mhs_id='${id}'`;

    selectQuery(res, sql);
};

exports.addMahasiswa = function (req, res) {
    const nim = req.body.nim;
    const nama = req.body.nama;
    const jurusan = req.body.jurusan;
    const sql = `INSERT INTO mahasiswa SET mhs_nim='${nim}', mhs_nama='${nama}', mhs_jurusan='${jurusan}'`;

    insertQuery(res, sql);
};

exports.updateMahasiswa = function (req, res) {
    const id = req.body.id;
    const nim = req.body.nim;
    const nama = req.body.nama;
    const jurusan = req.body.jurusan;
    const sql = `UPDATE mahasiswa SET mhs_nim='${nim}', mhs_nama='${nama}', mhs_jurusan='${jurusan}' WHERE mhs_id='${id}'`;

    updateOrDeleteQuery(res, sql, 'update');
};

exports.deleteMahasiswa = function (req, res) {
    const id = req.body.id;
    const sql = `DELETE FROM mahasiswa WHERE mhs_id='${id}'`;

    updateOrDeleteQuery(res, sql, 'delete');
};

exports.getMahasiswaMatakuliah = function (req, res) {
    const sql = 
        `SELECT
            m.mhs_nim AS nim
            , m.mhs_nama AS nama
            , m.mhs_jurusan AS jurusan
            , m2.mk_nama AS matakuliah
            , m2.mk_sks AS sks
        FROM
            krs k
            JOIN mahasiswa m ON m.mhs_id = k.mhs_id
            JOIN matakuliah m2 ON m2.mk_id = k.mk_id
        ORDER BY m.mhs_nim , m2.mk_nama `;

    conn.query(sql, function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            let i = 1;
            const result = rows.reduce((akumulasi, item) => {
                if (akumulasi[item.nim]) {
                    const group = akumulasi[item.nim];
                
                    if (Array.isArray(group.matakuliah)) {
                        group.matakuliah.push(item.matakuliah);
                        group.sks += item.sks;
                    } else {
                        group.matakuliah = [group.matakuliah, item.matakuliah];
                    }
                } else {
                    akumulasi[item.nim] = item;
                }
                
                return akumulasi;
            }, {});

            response(200, result, res);
        }
    });
};