const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const requestGudangSchema = new Schema(
  {
    tanggalRequest: { type: Date, required: true },
    idProjectOrder: { type: mongoose.Types.ObjectId, ref: "projectOrder" },
    idProduk: { type: mongoose.Types.ObjectId, ref: "Produk" },
    status: { type: String, required: true },
    karyawan: {
      idKaryawan: { type: mongoose.Types.ObjectId, ref: "Karyawan" },
      namaKaryawan: { type: String, required: true },
    },
    komponen: [
      {
        idKomponen: { type: mongoose.Types.ObjectId, ref: "Komponen" },
        namaKomponen: { type: String, required: true },
        jumlahKomponen: { type: Number, required: true },
      },
    ],
  },
  { collection: "requestGudang" }
);

module.exports = mongoose.model("RequestGudang", requestGudangSchema);
