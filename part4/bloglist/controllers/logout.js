const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

let tokenBlacklist = [];

// Fungsi untuk membersihkan token yang sudah kedaluwarsa dari blacklist
const cleanExpiredTokens = () => {
  const now = Math.floor(Date.now() / 1000); // Waktu saat ini dalam detik
  tokenBlacklist = tokenBlacklist.filter((tokenEntry) => tokenEntry.exp > now);
};

// Endpoint untuk logout dan blacklist token
usersRouter.post("/", async (request, response) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response.status(401).json({ error: "Token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Bersihkan token yang sudah kedaluwarsa dari blacklist
    cleanExpiredTokens();

    // Cek apakah token sudah di-blacklist
    if (tokenBlacklist.some((entry) => entry.token === token)) {
      return response.status(401).json({ error: "Token already invalidated" });
    }

    // Tambahkan token ke blacklist dengan waktu kedaluwarsa
    tokenBlacklist.push({ token, exp: decodedToken.exp });

    return response.status(200).json({
      message: "Successfully logged out",
    });
  } catch (error) {
    return response.status(401).json({
      error: "Token invalid",
    });
  }
});

module.exports = usersRouter;
