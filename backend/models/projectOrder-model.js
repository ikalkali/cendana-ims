const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectOrderSchema = new Schema(
  {
    tanggalOrder: { type: Date, required: true },
    konsumen: {
      namaKonsumen: { type: String, required: true },
      hpKonsumen: { type: String, required: true },
      emailKonsumen: { type: String, required: true },
      instansi: {
        namaInstansi: { type: String },
        provinsi: { type: String },
      },
    },
    produk: {
      idProduk: { type: mongoose.Types.ObjectId, ref: "Produk" },
      namaProduk: { type: String, required: true },
      jumlahProduk: { type: Number, required: true, min: 0 },
    },
    status: { type: String },
  },
  { collection: "projectOrder" }
);

module.exports = mongoose.model("ProjectOrder", projectOrderSchema);
