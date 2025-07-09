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
      date: new Date()
    });

    res.status(201).json({ message: "Blog posted successfully",  newblog });
  } catch (err) {
    console.error('Post blog error:', err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getblogs = async (req, res) => {
  try {
    const userId = req.user;
    
    const blogs = await Blog.find()
      .populate('author', 'username email')
      .sort({ createdAt: -1 });

    const formattedBlogs = blogs.map(blog => ({
      title: blog.title,
      summary: blog.summary,
      authorName: blog.author?.username || 'Unknown',
      authorEmail: blog.author?.email || 'N/A',
      date: blog.date,
    }));

    return res.status(200).json({ message: "All blogs fetched", blogs: formattedBlogs });
  } catch (err) {
    console.error('Get blogs error:', err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { postblogs, getblogs };
