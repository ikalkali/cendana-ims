const HttpError = require("../models/http-hook");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Gagal autentikasi");
    }
    const decodedToken = jwt.verify(token, "sangatrahasiajangandisebar");
    req.userData = { userId: decodedToken.userId, role: decodedToken.role };
    next();
  } catch (err) {
    const error = new HttpError("Login dahulu untuk akses bagian ini");
    return next(error);
  }
};
