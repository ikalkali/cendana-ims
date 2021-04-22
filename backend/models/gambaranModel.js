const komponen = {
  idKomponen: "number",
  namaKomponen: "string",
  stokKomponen: "number",
};

const produk = {
  idProduk: "number",
  namaProduk: "string",
  komponenProduk: [
    {
      idKomponen: "number",
      namaKomponen: "string",
      jumlahKomponen: "number",
    },
  ],
};

const projectOrder = {
  idProjectOrder: "number",
  tanggalOrder: "number",
  konsumen: {
    namaKonsumen: "string",
    hpKonsumen: "number",
    emailKonsumen: "string",
    instansi: {
      namaInstansi: "string",
      provinsi: "string",
    },
  },
  produk: {
    idProduk: "number",
    namaProduk: "string",
    jumlahProduk: "number",
  },
};

const karyawan = {
  idKaryawan: "string",
  namaKaryawan: "string",
  noHp: "number",
  emailKaryawan: "string",
  role: "string",
  password: "string",
  alamat: {
    jalan: "string",
    kecamatan: "string",
    kota: "string",
    provinsi: "string",
  },
};

const transaksiGudang = {
  tanggalTransaksi: "number",
  idProjectOrder: "number",
  keterangan: "string",
  karyawan: {
    idKaryawan: "number",
    namaKaryawan: "string",
    role: "string",
  },
  komponen: [
    {
      idKomponen: "number",
      namaKomponen: "string",
      jumlahKomponen: "number",
    },
  ],
};
