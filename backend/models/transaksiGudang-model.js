const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transaksiGudangSchema = new Schema(
  {
    tanggalTransaksi: { type: Date, required: true },
    idProjectOrder: { type: mongoose.Types.ObjectId, ref: "ProjectOrder" },
    idRequest: { type: mongoose.Types.ObjectId, ref: "RequestGudang" },
    keterangan: { type: String, required: true },
    karyawan: {
      idKaryawan: { type: mongoose.Types.ObjectId, ref: "Karyawan" },
      namaKaryawan: { type: String },
    },
    komponen: [
      {
        idKomponen: { type: mongoose.Types.ObjectId, ref: "Komponen" },
        namaKomponen: { type: String, required: true },
        jumlahKomponen: { type: Number, required: true },
        keterangan: { type: String },
      },
    ],
  },
  { collection: "transaksiGudang" }
);

module.exports = mongoose.model("TransaksiGudang", transaksiGudangSchema);
