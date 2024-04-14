const express = require("express");
const router = express.Router();

const Post = require("../../models/postmodal"); // Corrected import name

// Add Post
router.post("/createpost", async (req, res) => {
  const { title, content, postedBy } = req.body;
  try {
    const post = await Post.create({
      title,
      content,
      postedBy
    });
    res.status(201).json({
      success: true,
      post
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Show Posts
router.get("/showpost", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('postedBy', 'name');
    res.status(200).json({
      success: true,
      posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
