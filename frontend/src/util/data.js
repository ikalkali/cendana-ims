const data = [
  {
    id: "k1",
    Komponen: "7 SEGMENT 0.5 INCHI",
    Stok: 28,
  },
  {
    id: "k2",
    Komponen: "7 SEGMENT 1 INCHI",
    Stok: 101,
  },
  {
    id: "k3",
    Komponen: "7 SEGMENT 2.5 INCHI",
    Stok: 69,
  },
  {
    id: "k4",
    Komponen: "7 SEGMENT 4 INCHI",
    Stok: 8,
  },
  {
    id: "k5",
    Komponen: "ADAPTOR BUATAN SENDIRI",
    Stok: 5,
  },
  {
    id: "k6",
    Komponen: "ADAPTOR DC 12 V / 2A",
    Stok: 27,
  },
  {
    id: "k7",
    Komponen: "ADAPTOR DC 5 V / 3A",
    Stok: 22,
  },
  {
    id: "k8",
    Komponen: "ADAPTOR PRINTER HITAM",
    Stok: 10,
  },
  {
    id: "k9",
    Komponen: "ADAPTOR SWITCHING 10 A (DARI JAKARTA)",
    Stok: 3,
  },
  {
    id: "k10",
    Komponen: "ADAPTOR SWITCHING 10 A",
    Stok: 1,
  },
  {
    id: "k11",
    Komponen: "ADAPTOR SWITCHING 20 A",
    Stok: 3,
  },
  {
    id: "k12",
    Komponen: "ADAPTOR SWITCHING 40 A",
    Stok: 1,
  },
  {
    id: "k13",
    Komponen: "ADAPTOR SWITCHING 5 A",
    Stok: 11,
  },
  {
    id: "k14",
    Komponen: "AMPENOL 10 PIN",
    Stok: 18,
  },
  {
    id: "k15",
    Komponen: "AMPENOL 10 PIN",
    Stok: 100,
  },
  {
    id: "k16",
    Komponen: "AMPENOL 16 PIN",
    Stok: 6,
  },
  {
    id: "k17",
    Komponen: "AMS 1117-3,3V",
    Stok: 269,
  },
  {
    id: "k18",
    Komponen: "BAFO USB TO SERIAL DB9",
    Stok: 9,
  },
  {
    id: "k19",
    Komponen: "BATERAI CR 2032",
    Stok: 14,
  },
  {
    id: "k20",
    Komponen: "BAUT MIKA AKRILIK - THERMOSTAND",
    Stok: 10,
  },
];

let rows = [];

const createData = (id, komponen, stok) => {
  return { id, komponen, stok };
};

data.forEach((obj) => {
  rows.push(createData(obj.id, obj.Komponen, obj.Stok));
});

const callRows = () => {
  return rows;
};

export default callRows;
