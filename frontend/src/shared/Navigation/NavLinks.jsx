import React from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";

const NavLinks = (props) => {
  let userRole;
  // PRODUKSI
  if (props.role === "produksi" || props.role === "admin") {
    userRole = (
      <ul>
        <h4>PRODUKSI</h4>
        <li>
          <i className="far fa-edit"></i>
          <NavLink to="/form-request" exact>
            Buat Request
          </NavLink>
        </li>
        <li>
          <i className="far fa-clipboard"></i>
          <NavLink to="/status-request" exact>
            Status Request
          </NavLink>
        </li>
      </ul>
    );
  }
  // GUDANG
  if (props.role === "gudang" || props.role === "admin") {
    userRole = (
      <ul>
        <h4>GUDANG</h4>
        <li>
          <i className="fas fa-box"></i>
          <NavLink to="/form-barang-masuk" exact>
            Form Barang Masuk
          </NavLink>
        </li>
        <li>
          <i className="fas fa-box-open"></i>
          <NavLink to="/form-barang-keluar" exact>
            Form Barang Keluar
          </NavLink>
        </li>
        <li>
          <i className="far fa-envelope"></i>
          <NavLink to="/request-masuk" exact>
            Request Masuk
          </NavLink>
        </li>
        <li>
          <i className="fas fa-warehouse"></i>
          <NavLink to="/log-transaksi" exact>
            Log Transaksi
          </NavLink>
        </li>
      </ul>
    );
  }
  // KEPALA GUDANG
  if (props.role === "kepalaGudang" || props.role === "admin") {
    userRole = (
      <ul>
        <h4>KEPALA GUDANG</h4>
        <li>
          <i className="far fa-clipboard"></i>
          <NavLink to="/input-project-order" exact>
            Project Order Masuk
          </NavLink>
        </li>
        <li>
          <i className="fas fa-warehouse"></i>
          <NavLink to="/log-transaksi" exact>
            Log Transaksi
          </NavLink>
        </li>
        <li>
          <i className="fas fa-microchip"></i>
          <NavLink to="/add-komponen" exact>
            Add Komponen Baru
          </NavLink>
        </li>
        <li>
          <i className="fas fa-archive"></i>
          <NavLink to="/add-produk" exact>
            Add Produk Baru
          </NavLink>
        </li>
      </ul>
    );
  }
  if (props.role === "admin") {
    userRole = (
      <React.Fragment>
        <ul>
          <h4>PRODUKSI</h4>
          <li>
            <i className="far fa-edit"></i>
            <NavLink to="/form-request" exact>
              Buat Request
            </NavLink>
          </li>
          <li>
            <i className="far fa-clipboard"></i>
            <NavLink to="/status-request" exact>
              Status Request
            </NavLink>
          </li>
          <li>
            <i className="far fa-envelope"></i>
            <NavLink to="/form-barang-rusak" exact>
              Lapor Barang Rusak
            </NavLink>
          </li>
        </ul>
        <ul>
          <h4>GUDANG</h4>
          <li>
            <i className="fas fa-box"></i>
            <NavLink to="/form-barang-masuk" exact>
              Form Barang Masuk
            </NavLink>
          </li>
          <li>
            <i className="fas fa-box-open"></i>
            <NavLink to="/form-barang-keluar" exact>
              Form Barang Keluar
            </NavLink>
          </li>
          <li>
            <i className="far fa-envelope"></i>
            <NavLink to="/request-masuk" exact>
              Request Masuk
            </NavLink>
          </li>
          <li>
            <i className="fas fa-warehouse"></i>
            <NavLink to="/log-transaksi" exact>
              Log Transaksi
            </NavLink>
          </li>
        </ul>
        <ul>
          <h4>KEPALA GUDANG</h4>
          <li>
            <i className="far fa-clipboard"></i>
            <NavLink to="/input-project-order" exact>
              Project Order Masuk
            </NavLink>
          </li>
          <li>
            <i className="far fa-envelope"></i>
            <NavLink to="/request-dari-gudang" exact>
              Status Request Masuk
            </NavLink>
          </li>
        </ul>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {userRole}
      {userRole && <hr />}
      <ul>
        <h4>SEMUA</h4>
        <li>
          <i className="far fa-list-alt"></i>
          <NavLink to="/list-produk" exact>
            List Produk
          </NavLink>
        </li>
        <li>
          <i className="fas fa-list"></i>
          <NavLink to="/" exact>
            List Stok
          </NavLink>
        </li>
        <li>
          <i className="far fa-folder"></i>
          <NavLink to="/project-order" exact>
            Project Order
          </NavLink>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default NavLinks;
