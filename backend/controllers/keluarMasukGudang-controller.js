const HttpError = require("../models/http-hook");
const Komponen = require("../models/komponen-model");
const Request = require("../models/request-model");
const TransaksiGudang = require("../models/transaksiGudang-model");

const approveRequest = async (req, res, next) => {
  if (req.userData.role === "produksi") {
    const error = new HttpError(
      "Bagian produksi tidak boleh approve request, minta approval ke gudang atau kepala produksi",
      401
    );
    return next(error);
  }
  const { komponen, idRequest } = req.body;
  let komp;
  let kompSearch;
  komponen.forEach(async (obj) => {
    kompSearch = await Komponen.findById(obj.idKomponen);
    if (kompSearch.stokKomponen < obj.jumlahKomponen) {
      const error = new HttpError(
        "Jumlah request tidak boleh melebihi jumlah stok komponen"
      );
      return next(error);
    }
  });
  try {
    komponen.forEach(async (obj) => {
      try {
        komp = await Komponen.findById(obj.idKomponen);
        komp.stokKomponen = komp.stokKomponen - obj.jumlahKomponen;
        await komp.save();
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
  let requestMasuk;
  let transaksiBaru;
  try {
    requestMasuk = await Request.findById(idRequest);
    requestMasuk.status = "approved";
    transaksiBaru = new TransaksiGudang({
      tanggalTransaksi: new Date(Date.now()).toDateString(),
      idProjectOrder: requestMasuk.idProjectOrder,
      idRequest: requestMasuk._id,
      keterangan: "keluar",
      karyawan: requestMasuk.karyawan,
      komponen: requestMasuk.komponen,
    });
    await transaksiBaru.save();
    await requestMasuk.save();
  } catch (err) {
    console.log(err);
  }
  res.status(201).json({ komp });
};

const barangKeluar = async (req, res, next) => {
  if (req.userData.role === "produksi") {
    const error = new HttpError(
      "Bagian produksi tidak boleh keluarkan barang, minta approval ke gudang atau kepala produksi",
      401
    );
    return next(error);
  }
  const { komponen } = req.body;
  let komp;
  try {
    komponen.forEach(async (obj) => {
      try {
        komp = await Komponen.findById(obj.idKomponen);
        komp.stokKomponen =
          komp.stokKomponen - parseInt(obj.jumlahKomponen, 10);
        await komp.save();
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
  let transaksiBaru;
  transaksiBaru = new TransaksiGudang({
    tanggalTransaksi: new Date(Date.now()).toDateString(),
    keterangan: "keluar",
    komponen: komponen,
  });
  await transaksiBaru.save();
  res.status(201).json({ message: "barang keluar ok" });
};

const barangMasuk = async (req, res, next) => {
  if (req.userData.role === "produksi") {
    const error = new HttpError(
      "Bagian produksi tidak boleh edit data stok, minta approval ke gudang atau kepala produksi",
      401
    );
    return next(error);
  }
  const { komponen } = req.body;
  let komp;
  try {
    komponen.forEach(async (obj) => {
      try {
        komp = await Komponen.findById(obj.idKomponen);
        komp.stokKomponen =
          komp.stokKomponen + parseInt(obj.jumlahKomponen, 10);
        await komp.save();
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
  let transaksiBaru;
  transaksiBaru = new TransaksiGudang({
    tanggalTransaksi: new Date(Date.now()).toDateString(),
    keterangan: "masuk",
    komponen: komponen,
  });
  await transaksiBaru.save();
  res.status(201).json({ message: "barang masuk ok" });
};

exports.approveRequest = approveRequest;
exports.barangKeluar = barangKeluar;
exports.barangMasuk = barangMasuk;
