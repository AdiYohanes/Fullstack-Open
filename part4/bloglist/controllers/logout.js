const usersRouter = require("express").Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let tokenBlacklist = [];

// Logout and delete token
usersRouter.post("/", async (request, response) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response.status(401).json({ error: "Token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenBlacklist.includes(token)) {
      return response.status(401).json({ error: "Token already invalidated" });
    }

    // Tambahkan token ke blacklist
    tokenBlacklist.push(token);

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
