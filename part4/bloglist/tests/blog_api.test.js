// const mongoose = require("mongoose");
// const supertest = require("supertest");
// const assert = require("assert");
// const app = require("../app");
// const Blog = require("../models/blogs");
// const User = require("../models/users");
// const jwt = require("jsonwebtoken");

// const api = supertest(app);

// let token; // Token JWT yang valid
// let user; // Data pengguna yang akan digunakan untuk tes

// // Helper function to fetch blogs
// const fetchBlogs = async () => {
//   const response = await api
//     .get("/api/blogs")
//     .expect(200)
//     .expect("Content-Type", /application\/json/);
//   return response.body;
// };

// describe("Blog API tests", () => {
//   beforeAll(async () => {
//     // Hapus semua data sebelum memulai tes
//     await User.deleteMany({});
//     await Blog.deleteMany({});

//     // Buat pengguna baru
//     user = new User({
//       username: "testuser",
//       name: "Test User",
//       passwordHash: "hashedpassword",
//     });
//     await user.save();

//     // Buat token JWT
//     const tokenPayload = { id: user._id, username: user.username };
//     token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1h" });
//   });

//   beforeEach(async () => {
//     // Bersihkan database blog sebelum setiap tes
//     await Blog.deleteMany({});

//     const initialBlog = new Blog({
//       title: "Belajar Node.js",
//       url: "http://nodejs.com",
//       likes: 5,
//       user: user._id,
//       author: user.name,
//     });
//     await initialBlog.save();
//   });

//   // Test GET /api/blogs
//   describe("GET /api/blogs", () => {
//     test("blogs are returned as JSON", async () => {
//       await api
//         .get("/api/blogs")
//         .expect(200)
//         .expect("Content-Type", /application\/json/);
//     });

//     test("blogs contain a specific title", async () => {
//       const blogs = await fetchBlogs();
//       assert(blogs.some((blog) => blog.title === "Belajar Node.js"));
//     });
//   });

//   // Test POST /api/blogs
//   describe("POST /api/blogs", () => {
//     test("a new blog is added successfully with a valid token", async () => {
//       const initialBlogs = await fetchBlogs();
//       const newBlog = {
//         title: "Belajar MongoDB",
//         url: "http://mongodb.com",
//         likes: 10,
//       };

//       const response = await api
//         .post("/api/blogs")
//         .set("Authorization", `Bearer ${token}`) // Token valid
//         .send(newBlog)
//         .expect(201)
//         .expect("Content-Type", /application\/json/);

//       const updatedBlogs = await fetchBlogs();
//       assert.strictEqual(updatedBlogs.length, initialBlogs.length + 1);
//       assert(updatedBlogs.some((blog) => blog.title === newBlog.title));
//     });

//     test("adding a blog fails with 401 if token is not provided", async () => {
//       const newBlog = {
//         title: "Unauthorized Blog",
//         url: "http://unauthorized.com",
//         likes: 0,
//       };

//       await api.post("/api/blogs").send(newBlog).expect(401); // Token tidak disertakan
//     });

//     test("returns 400 if title is missing", async () => {
//       const newBlogWithoutTitle = {
//         url: "http://missingtitle.com",
//       };

//       const response = await api
//         .post("/api/blogs")
//         .set("Authorization", `Bearer ${token}`)
//         .send(newBlogWithoutTitle)
//         .expect(400); // Title missing

//       assert.strictEqual(response.body.error, "Title is required");
//     });

//     test("returns 400 if URL is missing", async () => {
//       const newBlogWithoutUrl = {
//         title: "Blog Without URL",
//       };

//       const response = await api
//         .post("/api/blogs")
//         .set("Authorization", `Bearer ${token}`)
//         .send(newBlogWithoutUrl)
//         .expect(400); // URL missing

//       assert.strictEqual(response.body.error, "URL is required");
//     });
//   });

//   // Test DELETE /api/blogs/:id
//   describe("DELETE /api/blogs/:id", () => {
//     test("deletes a blog with a valid token", async () => {
//       const blogs = await fetchBlogs();
//       const blogToDelete = blogs[0];

//       await api
//         .delete(`/api/blogs/${blogToDelete.id}`)
//         .set("Authorization", `Bearer ${token}`) // Token valid
//         .expect(204);

//       const updatedBlogs = await fetchBlogs();
//       assert(!updatedBlogs.some((blog) => blog.id === blogToDelete.id));
//     });

//     test("deleting a blog fails with 403 if user is not the owner", async () => {
//       // Buat pengguna lain
//       const anotherUser = new User({
//         username: "anotheruser",
//         name: "Another User",
//         passwordHash: "hashedpassword",
//       });
//       await anotherUser.save();

//       // Buat token untuk pengguna lain
//       const anotherToken = jwt.sign(
//         { id: anotherUser._id, username: anotherUser.username },
//         process.env.JWT_SECRET,
//         { expiresIn: "1h" }
//       );

//       const blogs = await fetchBlogs();
//       const blogToDelete = blogs[0];

//       await api
//         .delete(`/api/blogs/${blogToDelete.id}`)
//         .set("Authorization", `Bearer ${anotherToken}`) // Token pengguna lain
//         .expect(403); // Forbidden
//     });

//     test("deleting a blog fails with 401 if token is not provided", async () => {
//       const blogs = await fetchBlogs();
//       const blogToDelete = blogs[0];

//       await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401); // No token
//     });
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//   });
// });
