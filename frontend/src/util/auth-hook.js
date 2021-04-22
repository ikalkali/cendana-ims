import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [namaKaryawan, setNamaKaraywan] = useState(false);
  const [roleKaryawan, setRoleKaryawan] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, role, nama, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setRoleKaryawan(role);
    setNamaKaraywan(nama);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 9000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        namaKaryawan: nama,
        roleKaryawan: role,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setRoleKaryawan(null);
    setNamaKaraywan(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.roleKaryawan,
        storedData.namaKaryawan,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId, roleKaryawan, namaKaryawan };
};
