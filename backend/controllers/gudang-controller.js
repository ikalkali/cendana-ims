const Komponen = require("../models/komponen-model");
const Produk = require("../models/produk-model");
const Request = require("../models/request-model");
const HttpError = require("../models/http-hook");

const getKomponen = (req, res, next) => {
  Komponen.find()
    .then((komponen) => {
      return res.status(200).json({ komponen });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getProduk = (req, res, next) => {
  Produk.find()
    .then((produk) => {
      const produkReturn = produk;
      return res.status(200).json({ produkReturn });
    })
    .catch((err) => console.log(err));
};

const testKomponen = (req, res, next) => {
  const createProduk = new Produk({
    namaProduk: "test123",
    komponenProduk: [
      {
        idKomponen: "60705b12579baa2db41e29a2",
        namaKomponen: "test123",
        jumlahKomponen: 10,
      },
      {
        idKomponen: "60705b12579baa2db41e29a4",
        namaKomponen: "test komponen 2",
        jumlahKomponen: 5,
      },
    ],
  });
  createProduk
    .save()
    .then((produkBaru) => {
      return res.status(201).json({ produkBaru });
    })
    .catch((err) => console.log(err));
};

const buatRequest = (req, res, next) => {
  const {
    komponen,
    idProduk,
    idProjectOrder,
    idKaryawan,
    namaKaryawan,
  } = req.body;

  komponen.forEach((obj) => {
    if (obj.jumlahKomponen > obj.jumlahStok) {
      const error = new HttpError(
        "Jumlah request tidak boleh melebihi jumlah stok sekarang",
        401
      );
      return next(error);
    }
  });

  komponen.forEach((obj) => {
    delete obj.jumlahStok;
  });

  const waktuSekarang = new Date(Date.now());
  const requestBaru = new Request({
    tanggalRequest: waktuSekarang.toDateString(),
    idProjectOrder: idProjectOrder,
    status: "pending",
    karyawan: {
      idKaryawan: idKaryawan,
      namaKaryawan: namaKaryawan,
    },
    komponen: komponen,
    idProduk: idProduk,
  });

  requestBaru
    .save()
    .then((reqBaru) => {
      return res.status(201).json({ reqBaru });
    })
    .catch((err) => {
      const error = new HttpError(
        "Error pada server, coba lagi lain waktu",
        500
      );
      return next(error);
    });
};

const getRequest = (req, res, next) => {
  Request.find()
    .then((r) => {
      res.status(201).json({ r });
    })
    .catch((err) => {
      const error = new HttpError(
        "Error pada server, coba lagi lain waktu",
        500
      );
      return next(error);
    });
};

const getRequestById = (req, res, next) => {
  const { reqId } = req.params.rid;
  Request.findById(reqId)
    .then((reqs) => {
      return res.status(200).json({ reqs });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getProdukById = (req, res, next) => {
  const prodId = req.params.pid;

  Produk.findById(prodId)
    .populate("komponenProduk.idKomponen")
    .then((prod) => {
      return res.status(200).json({ prod });
    })
    .catch((err) => console.log(err));
};

exports.getKomponen = getKomponen;
exports.testKomponen = testKomponen;
exports.getProduk = getProduk;
exports.buatRequest = buatRequest;
exports.getRequest = getRequest;
exports.getRequestById = getRequestById;
exports.getProdukById = getProdukById;
