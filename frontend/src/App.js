import React from "react";
import MainNavigation from "./shared/Navigation/MainNavigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListStok from "./Produksi/pages/ListStok";
import ListProduk from "./Produksi/pages/ListProduk";
import ProjectOrder from "./Produksi/pages/ProjectOrder";
import FormRequest from "./Produksi/pages/FormRequest";
import LaporBarangRusak from "./Produksi/pages/LaporBarangRusak";
import StatusRequest from "./Produksi/pages/StatusRequest";
import FormBarangMasuk from "./Gudang/pages/FormBarangMasuk";
import FormBarangKeluar from "./Gudang/pages/FormBarangKeluar";
import RequestKeGudang from "./Gudang/pages/RequestMasukGudang";
import RequestRestock from "./Gudang/pages/RequestRestock";
import InputProjectOrder from "./KepalaProduksi/pages/InputProjectOrder";
import ReqDariGudang from "./KepalaProduksi/pages/RequestDariGudang";
import LogTransaksi from "./Gudang/pages/LogTransaksi";
import AuthPage from "./Auth/AuthPage";
import { AuthContext } from "./Auth/auth-context";
import { useAuth } from "./util/auth-hook";
import "./App.css";
import AddKomponenBaru from "./KepalaProduksi/pages/AddKomponenBaru";
import AddProdukBaru from "./KepalaProduksi/pages/AddProdukBaru";

function App() {
  const {
    token,
    userId,
    roleKaryawan,
    namaKaryawan,
    login,
    logout,
  } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        idKaryawan: userId,
        role: roleKaryawan,
        namaKaryawan: namaKaryawan,
        login,
        logout,
      }}
    >
      <Router>
        <Switch>
          <div className="container">
            <MainNavigation />
            <div className="main">
              <Route path="/" exact>
                <ListStok />
              </Route>
              <Route path="/list-produk" exact>
                <ListProduk />
              </Route>
              <Route path="/project-order">
                <ProjectOrder />
              </Route>
              {/* ROUTE PRODUKSI */}
              <Route path="/form-request" exact>
                <FormRequest />
              </Route>
              <Route path="/form-barang-rusak" exact>
                <LaporBarangRusak />
              </Route>
              <Route path="/status-request" exact>
                <StatusRequest />
              </Route>
              {/* ROUTE GUDANG */}
              <Route path="/form-barang-masuk" exact>
                <FormBarangMasuk />
              </Route>
              <Route path="/form-barang-keluar" exact>
                <FormBarangKeluar />
              </Route>
              <Route path="/log-transaksi" component={LogTransaksi} />
              <Route path="/request-masuk" component={RequestKeGudang} />
              <Route path="/request-restock" exact>
                <RequestRestock />
              </Route>
              {/* ROUTE KEPALA PRODUKSI */}
              <Route path="/input-project-order" exact>
                <InputProjectOrder />
              </Route>
              <Route path="/request-dari-gudang" exact>
                <ReqDariGudang />
              </Route>
              <Route path="/add-komponen" component={AddKomponenBaru} />
              <Route path="/add-produk" component={AddProdukBaru} />
              <Route path="/login" component={AuthPage} />
            </div>
          </div>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
