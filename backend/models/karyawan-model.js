const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const karyawanSchema = new Schema(
  {
    namaKaryawan: { type: String, required: true },
    noHp: { type: Number, required: true },
    emailKaryawan: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true, minLength: 6 },
    alamat: {
      jalan: { type: String },
      kecamatan: { type: String },
      kota: { type: String, required: true },
      provinsi: { type: String, required: true },
    },
  },
  { collection: "karyawan" }
);

module.exports = mongoose.model("Karyawan", karyawanSchema);
