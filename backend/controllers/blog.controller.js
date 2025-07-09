const Blog = require('../models/blog.model');

const postblogs = async (req, res) => {
  try {
    const user = req.user;
    const { title, summary } = req.body;

    if (!title || !summary) {
      return res.status(400).json({ message: "Title and summary fields are required" });
    }

    const newblog = await Blog.create({
      title,
      summary,
      author: user._id,
    });

    res.status(201).json({ message: "Blog posted successfully", blog: newblog });
  } catch (err) {
    console.error('Post blog error:', err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getblogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'username email')
      .sort({ createdAt: -1 });

    const formattedBlogs = blogs.map(blog => ({
      title: blog.title,
      summary: blog.summary,
      authorName: blog.author.name,
      authorEmail: blog.author.email,
      date: blog.date,
    }));

    return res.status(200).json({ message: "All blogs fetched", blogs: formattedBlogs });
  } catch (err) {
    console.error('Get blogs error:', err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { postblogs, getblogs };
