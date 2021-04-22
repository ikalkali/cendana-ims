const { v4: uuidv4 } = require("uuid");

const data = [
  {
    Konsumen: "Pak Nova",
    email: "nova@gmail.com",
    noHp: "0867753434",
    idProduk: "p1",
    jumlahProduk: 2,
  },
  {
    Konsumen: "Pak Doni",
    email: "nova@gmail.com",
    noHp: "0867753434",
    idProduk: "p2",
    jumlahProduk: 2,
  },
  {
    Konsumen: "Pak Soni",
    email: "nova@gmail.com",
    noHp: "0867753434",
    idProduk: "p1",
    jumlahProduk: 2,
  },
  {
    Konsumen: "Pak Nova",
    email: "nova@gmail.com",
    noHp: "0867753434",
    idProduk: "p1",
    jumlahProduk: 2,
  },
  {
    Konsumen: "Pak Doni",
    email: "nova@gmail.com",
    noHp: "0867753434",
    idProduk: "p2",
    jumlahProduk: 2,
  },
  {
    Konsumen: "Pak Soni",
    email: "nova@gmail.com",
    noHp: "0867753434",
    idProduk: "p1",
    jumlahProduk: 2,
  },
  {
    Konsumen: "Pak Nova",
    email: "nova@gmail.com",
    noHp: "0867753434",
    idProduk: "p1",
    jumlahProduk: 2,
  },
  {
    Konsumen: "Pak Doni",
    email: "nova@gmail.com",
    noHp: "0867753434",
    idProduk: "p2",
    jumlahProduk: 2,
  },
  {
    Konsumen: "Pak Soni",
    email: "nova@gmail.com",
    noHp: "0867753434",
    idProduk: "p1",
    jumlahProduk: 2,
  },
];

const convertedData = data.map((obj) => {
  return {
    ...obj,
    id: uuidv4(),
  };
});

const getProjectOrder = () => {
  return convertedData;
};

const projectOrder = {
  getProjectOrder,
};

export default projectOrder;
