const TransaksiGudang = require("../models/transaksiGudang-model");
const ProjectOrder = require("../models/projectOrder-model");
const Komponen = require("../models/komponen-model");
const Produk = require("../models/produk-model");
const HttpError = require("../models/http-hook");

const getTransaksiGudang = (req, res, next) => {
  TransaksiGudang.find()
    .then((transaksi) => {
      return res.status(200).json({ transaksi });
    })
    .catch((err) => console.log(error));
};

const buatProjectOrder = async (req, res, next) => {
  const {
    idProduk,
    namaProduk,
    jumlahProduk,
    namaKonsumen,
    email,
    noHp,
    instansi,
    provinsi,
  } = req.body;
  const projectOrderBaru = new ProjectOrder({
    tanggalOrder: new Date(Date.now()).toDateString(),
    konsumen: {
      namaKonsumen,
      hpKonsumen: noHp,
      emailKonsumen: email,
      instansi: {
        namaInstansi: instansi,
        provinsi: provinsi,
      },
    },
    produk: {
      idProduk: idProduk,
      namaProduk: namaProduk,
      jumlahProduk: jumlahProduk,
    },
    status: "berjalan",
  });
  const poBaru = await projectOrderBaru.save();
  res.status(201).json({ message: "Project order baru berhasil dibuat!" });
};

const getProjectOrder = (req, res, next) => {
  ProjectOrder.find()
    .then((projectOrder) => {
      return res.status(200).json({ projectOrder });
    })
    .catch((err) => console.log(err));
};

const resolveProjectOrder = (req, res, next) => {
  const { projId } = req.body;
  console.log("CALLED");
  ProjectOrder.findById(projId)
    .then((po) => {
      po.status = "selesai";
      po.save();
    })
    .then((poEdit) => {
      return res.status(201).json({ poEdit, message: "Berhasil resolve PO" });
    })
    .catch((err) => {
      console.log(err);
      const error = new HttpError(
        "Masalah pada server, coba lagi lain waktu",
        500
      );
      return next(error);
    });
};

const addKomponenBaru = async (req, res, next) => {
  const { komponen } = req.body;
  let komponenBaru;
  komponen.forEach(async (obj) => {
    try {
      komponenBaru = new Komponen({
        namaKomponen: obj.namaKomponen,
        stokKomponen: obj.inisialStok,
      });
      await komponenBaru.save();
    } catch (err) {
      const error = new HttpError(
        "Terjadi error pada server, coba lagi lain waktu",
        500
      );
      return next(error);
    }
  });
  return res.status(201).json({ message: "Berhasil buat komponen baru" });
};

const addProdukBaru = async (req, res, next) => {
  const { namaProduk, komponen } = req.body;
  let produkBaru;
  try {
    produkBaru = new Produk({
      namaProduk: namaProduk,
      komponenProduk: komponen,
    });
    await produkBaru.save();
    return res.status(201).json({ produkBaru });
  } catch (err) {
    const error = new HttpError(
      "Terjadi error pada server, coba lagi lain waktu",
      500
    );
    return next(error);
  }
};

exports.getTransaksiGudang = getTransaksiGudang;
exports.buatProjectOrder = buatProjectOrder;
exports.getProjectOrder = getProjectOrder;
exports.resolveProjectOrder = resolveProjectOrder;
exports.addKomponenBaru = addKomponenBaru;
exports.addProdukBaru = addProdukBaru;
