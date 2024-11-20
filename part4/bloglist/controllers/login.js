const usersRouter = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

usersRouter.post("/", async (request, response, next) => {
  try {
    const { username, password } = request.body;

    console.log("Request body received:", request.body);

    // Validasi input
    if (!username || !password) {
      console.error("Login failed: Missing username or password");
      return response
        .status(400)
        .json({ error: "Username dan password wajib diberikan" });
    }

    // Cari pengguna berdasarkan username
    const user = await User.findOne({ username });
    console.log("User retrieved from database:", user);

    if (!user) {
      console.error("Login failed: User not found");
      return response
        .status(401)
        .json({ error: "Invalid username or password" });
    }

    // Validasi password
    const validPassword = await bcrypt.compare(
      password.trim(),
      user.passwordHash
    );
    console.log("Password validation result:", validPassword);

    if (!validPassword) {
      console.error("Login failed: Invalid password");
      return response
        .status(401)
        .json({ error: "Invalid username or password" });
    }

    // Pastikan JWT_SECRET terdefinisi
    if (!process.env.JWT_SECRET) {
      console.error("Server error: JWT_SECRET is not defined");
      return response.status(500).json({ error: "Internal server error" });
    }

    // Buat token JWT
    const tokenPayload = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("JWT generated successfully");
    console.log("Token Payload", tokenPayload)

    // Kirim respons sukses
    response.status(200).json({
      token,
      username: user.username,
      name: user.name,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error during login:", error.message || error);
    next(error);
  }
});

module.exports = usersRouter;
