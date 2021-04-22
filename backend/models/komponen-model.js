const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const komponenSchema = new Schema(
  {
    namaKomponen: { type: String, required: true },
    stokKomponen: { type: Number, required: true, min: 0 },
  },
  { collection: "komponen" }
);

module.exports = mongoose.model("Komponen", komponenSchema);
