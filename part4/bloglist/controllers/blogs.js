const blogRouter = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/users");
const { authenticator } = require("../utils/middleware");

// POST add new blog
blogRouter.post("/", authenticator, async (request, response) => {
  try {
    const { title, url, likes = 0 } = request.body;

    if (!title) {
      return response.status(400).json({ error: "Title is required" });
    }
    if (!url) {
      return response.status(400).json({ error: "URL is required" });
    }

    // Ambil user dari token melalui request.user
    const user = await User.findById(request.user.id);
    if (!user) {
      return response.status(400).json({ error: "No users found for author" });
    }

    const blog = new Blog({
      title,
      url,
      author: user.name,
      user: user._id,
      likes,
    });
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

// GET all the data blog
blogRouter.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({})
      .populate("user", { username: 1, name: 1 })
      .exec();

    response.json(blogs);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// Delete blog by id
blogRouter.delete("/:id", authenticator, async (request, response) => {
  try {
    const blogId = request.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }
    // Periksa apakah pengguna adalah pemilik blog
    if (blog.user.toString() !== request.user.id.toString()) {
      return response
        .status(403)
        .json({ error: "You are not authorized to delete this blog" });
    }
    await Blog.findByIdAndDelete(blogId);
    console.log(`Blog with id ${blogId} has been deleted`);

    response
      .status(200)
      .json({ message: `Blog with id ${blogId} has been deleted` });
  } catch (error) {
    // Tangani error
    console.error("Error deleting blog:", error.message);
    response.status(400).json({ error: error.message });
  }
});

// POST update blog by id
blogRouter.put("/:id", authenticator, async (request, response) => {
  try {
    const blogId = request.params.id;
    const { title, url, likes } = request.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, url, likes },
      { new: true },
      { runValidators: true }
    );

    if (!updatedBlog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    response.status(200).json({
      updatedBlog,
      message: `Blog with id ${blogId} has been updated`,
    });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

module.exports = blogRouter;
