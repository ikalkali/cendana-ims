import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  idKaryawan: null,
  token: null,
  namaKaryawan: null,
  role: null,
  login: () => {},
  logout: () => {},
});
