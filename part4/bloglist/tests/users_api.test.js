// const mongoose = require("mongoose");
// const supertest = require("supertest");
// const bcrypt = require("bcrypt");
// const app = require("../app");
// const api = supertest(app);
// const User = require("../models/users");
// const helper = require("./test_helper");

// describe("when there is initially one user in db", () => {
//   beforeEach(async () => {
//     await User.deleteMany({});

//     const passwordHash = await bcrypt.hash(helper.initialUsers[0].password, 10);
//     const user = new User({
//       username: helper.initialUsers[0].username,
//       name: helper.initialUsers[0].name,
//       passwordHash,
//     });

//     await user.save();
//   });

//   test("creation succeeds with a fresh username", async () => {
//     const usersAtStart = await helper.usersInDb();

//     const newUser = {
//       username: "mluukkai",
//       name: "Matti Luukkainen",
//       password: "salainen",
//     };

//     await api
//       .post("/api/users")
//       .send(newUser)
//       .expect(201)
//       .expect("Content-Type", /application\/json/);

//     const usersAtEnd = await helper.usersInDb();
//     expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

//     const usernames = usersAtEnd.map((u) => u.username);
//     expect(usernames).toContain(newUser.username);
//   });

//   test("creation fails with proper statuscode and message if username already taken", async () => {
//     const usersAtStart = await helper.usersInDb();

//     const newUser = {
//       username: "root",
//       name: "Superuser",
//       password: "salainen",
//     };

//     const result = await api
//       .post("/api/users")
//       .send(newUser)
//       .expect(400)
//       .expect("Content-Type", /application\/json/);

//     expect(result.body.error).toContain("username sudah digunakan");

//     const usersAtEnd = await helper.usersInDb();
//     expect(usersAtEnd).toHaveLength(usersAtStart.length);
//   });

//   test("creation fails with proper statuscode and message if username is too short", async () => {
//     const usersAtStart = await helper.usersInDb();

//     const newUser = {
//       username: "ro",
//       name: "Short Username",
//       password: "salainen",
//     };

//     const result = await api
//       .post("/api/users")
//       .send(newUser)
//       .expect(400)
//       .expect("Content-Type", /application\/json/);

//     expect(result.body.error).toContain("username harus minimal 3 karakter");

//     const usersAtEnd = await helper.usersInDb();
//     expect(usersAtEnd).toHaveLength(usersAtStart.length);
//   });

//   test("creation fails with proper statuscode and message if password is too short", async () => {
//     const usersAtStart = await helper.usersInDb();

//     const newUser = {
//       username: "validusername",
//       name: "Short Password",
//       password: "pw",
//     };

//     const result = await api
//       .post("/api/users")
//       .send(newUser)
//       .expect(400)
//       .expect("Content-Type", /application\/json/);

//     expect(result.body.error).toContain("password harus minimal 3 karakter");

//     const usersAtEnd = await helper.usersInDb();
//     expect(usersAtEnd).toHaveLength(usersAtStart.length);
//   });

//   test("creation fails with proper statuscode and message if username is missing", async () => {
//     const usersAtStart = await helper.usersInDb();

//     const newUser = {
//       name: "No Username",
//       password: "password123",
//     };

//     const result = await api
//       .post("/api/users")
//       .send(newUser)
//       .expect(400)
//       .expect("Content-Type", /application\/json/);

//     expect(result.body.error).toContain(
//       "username dan password wajib diberikan"
//     );

//     const usersAtEnd = await helper.usersInDb();
//     expect(usersAtEnd).toHaveLength(usersAtStart.length);
//   });

//   test("creation fails with proper statuscode and message if password is missing", async () => {
//     const usersAtStart = await helper.usersInDb();

//     const newUser = {
//       username: "nopassword",
//       name: "No Password",
//     };

//     const result = await api
//       .post("/api/users")
//       .send(newUser)
//       .expect(400)
//       .expect("Content-Type", /application\/json/);

//     expect(result.body.error).toContain(
//       "username dan password wajib diberikan"
//     );

//     const usersAtEnd = await helper.usersInDb();
//     expect(usersAtEnd).toHaveLength(usersAtStart.length);
//   });
// });

// afterAll(() => {
//   mongoose.connection.close();
// });
