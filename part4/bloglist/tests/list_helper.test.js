const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const mongoose = require("mongoose"); // If you're using mongoose for DB operations

let blogs;

beforeEach(() => {
  blogs = [
    {
      _id: "1",
      title: "First Blog",
      author: "Author One",
      url: "http://example.com/1",
      likes: 7,
      __v: 0,
    },
    {
      _id: "2",
      title: "Second Blog",
      author: "Author Two",
      url: "http://example.com/2",
      likes: 5,
      __v: 0,
    },
    {
      _id: "3",
      title: "Third Blog",
      author: "Author Three",
      url: "http://example.com/3",
      likes: 12,
      __v: 0,
    },
    {
      _id: "4",
      title: "Fourth Blog",
      author: "Author Four",
      url: "http://example.com/4",
      likes: 8,
      __v: 0,
    },
    {
      _id: "5",
      title: "Fifth Blog",
      author: "Author Five",
      url: "http://example.com/5",
      likes: 6,
      __v: 0,
    },
  ];
});

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });
});

describe("favorite blog", () => {
  test("when list is empty, returns null", () => {
    const result = listHelper.favoriteBlog([]);
    assert.strictEqual(result, null);
  });

  test("when list has blogs, returns the one with most likes", () => {
    const result = listHelper.favoriteBlog(blogs);

    assert.deepStrictEqual(result, {
      title: "Third Blog",
      author: "Author Three",
      likes: 12,
    });
  });

  test("when multiple blogs have the same likes, returns one of them", () => {
    const blogsWithTie = [
      {
        _id: "1",
        title: "Tie Blog 1",
        author: "Author A",
        url: "http://example.com/1",
        likes: 10,
        __v: 0,
      },
      {
        _id: "2",
        title: "Tie Blog 2",
        author: "Author B",
        url: "http://example.com/2",
        likes: 10,
        __v: 0,
      },
    ];

    const result = listHelper.favoriteBlog(blogsWithTie);

    const expectedResults = [
      {
        title: "Tie Blog 1",
        author: "Author A",
        likes: 10,
      },
      {
        title: "Tie Blog 2",
        author: "Author B",
        likes: 10,
      },
    ];

    // Check if result matches one of the expected results
    assert.ok(
      expectedResults.some(
        (expected) => JSON.stringify(expected) === JSON.stringify(result)
      )
    );
  });
});

describe("most blogs", () => {
  test("when list is empty, returns null", () => {
    const result = listHelper.mostBlogs([]);
    assert.strictEqual(result, null);
  });

  test("when list has blogs, returns the author with most blogs", () => {
    const result = listHelper.mostBlogs(blogs);

    // Assuming Author Three has the most blogs in your sample
    assert.deepStrictEqual(result, {
      author: "Author One",
      blogs: 1, // Adjust based on correct logic for counting blogs
    });
  });
});

describe("most likes", () => {
  test("when list is empty, returns null", () => {
    const result = listHelper.mostLikes([]);
    assert.strictEqual(result, null);
  });

  test("when list has blogs, returns the author with most likes", () => {
    const result = listHelper.mostLikes(blogs);

    assert.deepStrictEqual(result, {
      author: "Author Three",
      likes: 12, // Adjust this to match the actual result
    });
  });
});

afterAll(() => {
  mongoose.connection.close(); // Make sure to properly import mongoose and establish a connection
});
