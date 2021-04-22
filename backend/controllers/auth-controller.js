const Karyawan = require("../models/karyawan-model");
const HttpError = require("../models/http-hook");
const jwt = require("jsonwebtoken");

// const login = (req, res, next) => {
//   const { email, password } = req.body;
//   let token;
//   Karyawan.findOne({ emailKaryawan: email })
//     .then((karyawan) => {
//       if (!karyawan || karyawan.password !== password) {
//         const error = new HttpError("Password atau email salah", 401);
//         return next(error);
//       }
//       token = jwt.sign(
//         { userId: karyawan._id, role: karyawan.role },
//         "sangatrahasiajangandisebar",
//         { expiresIn: "5h" }
//       );
//     })
//     .catch((err) => {
//       const error = new HttpError("Masalah pada server", 500);
//       return next(error);
//     });
//   res.status(201).json({ loggedIn: karyawan });
// };

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let token;
  let karyawan;
  try {
    karyawan = await Karyawan.findOne({ emailKaryawan: email });
    if (!karyawan || karyawan.password !== password) {
      const error = new HttpError("Password atau email salah", 401);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("Masalah pada server", 500);
    return next(error);
  }

  try {
    token = await jwt.sign(
      { userId: karyawan._id, role: karyawan.role },
      "sangatrahasiajangandisebar",
      { expiresIn: "5h" }
    );
  } catch (err) {
    const error = new HttpError("Masalah pada server", 500);
    return next(error);
  }

  res.status(201).json({ loggedIn: karyawan, token: token });
};

exports.login = login;
