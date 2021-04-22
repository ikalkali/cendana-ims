const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const produkSchema = new Schema(
  {
    namaProduk: { type: String, required: true },
    komponenProduk: [
      {
        idKomponen: { type: mongoose.Types.ObjectId, ref: "Komponen" },
        namaKomponen: { type: String, required: true },
        jumlahKomponen: { type: String, required: true, min: 0 },
      },
    ],
  },
  { collection: "produk" }
);

module.exports = mongoose.model("Produk", produkSchema);
