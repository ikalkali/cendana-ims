const express = require("express");
const gudangController = require("../controllers/gudang-controller");
const keluarMasukGudangController = require("../controllers/keluarMasukGudang-controller");
const administrasiGudangController = require("../controllers/administrasiGudang-controller");
const authController = require("../controllers/auth-controller");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/komponen", gudangController.getKomponen);
router.get("/produk/:pid", gudangController.getProdukById);
router.get("/produk", gudangController.getProduk);
router.get("/project-order", administrasiGudangController.getProjectOrder);
router.post("/auth-login", authController.login);
router.get("/request", gudangController.getRequest);
router.get("/request/:rid", gudangController.getRequestById);
router.get("/transaksi", administrasiGudangController.getTransaksiGudang);

router.use(checkAuth);

router.post("/request", gudangController.buatRequest);
router.patch("/request", keluarMasukGudangController.approveRequest);

router.patch("/barang-keluar", keluarMasukGudangController.barangKeluar);
router.patch("/barang-masuk", keluarMasukGudangController.barangMasuk);

router.post("/project-order", administrasiGudangController.buatProjectOrder);
router.patch(
  "/project-order",
  administrasiGudangController.resolveProjectOrder
);
router.post("/add-komponen", administrasiGudangController.addKomponenBaru);
router.post("/add-produk", administrasiGudangController.addProdukBaru);

router.get("/test", gudangController.testKomponen);

module.exports = router;
