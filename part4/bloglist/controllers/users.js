const usersRouter = require("express").Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Rute untuk membuat pengguna baru
usersRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    if (!username || !password) {
      return response
        .status(400)
        .json({ error: "username dan password wajib diberikan" });
    }

    if (username.length < 3) {
      return response
        .status(400)
        .json({ error: "username harus minimal 3 karakter" });
    }

    if (password.length < 3) {
      return response
        .status(400)
        .json({ error: "password harus minimal 3 karakter" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response.status(400).json({ error: "username sudah digunakan" });
    }

    // const saltRounds = 10;
    // const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash: password,
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

// Rute untuk mengambil semua pengguna
usersRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({}).populate("blogs", {
      url: 1,
      title: 1,
      author: 1,
    });
    response.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
